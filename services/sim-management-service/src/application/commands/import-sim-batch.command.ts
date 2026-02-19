import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OutboxRepository } from '@telecom/toolkit/database';
import { PrismaService, PrismaTransactionClient } from '../../infrastructure/database/prisma.service';
import { SimImportBatchRepository } from '../../infrastructure/database/repositories/sim-import-batch.repository';
import { SIM_EVENTS } from '../../domain/events/sim-events';
import { SimType, ImportStatus } from '../../domain/enums';
import { SimImportBatchWithErrors } from '../../domain/types';

export interface ImportSimBatchInput {
  csvContent: string;
  supplier: string;
  fileName: string;
  simType: SimType;
}

interface ParsedPhysicalSim {
  iccid: string;
  imsi: string;
  formFactor: string;
  pin: string;
  puk: string;
  warehouseLocation: string;
}

interface ParsedEsim {
  iccid: string;
  imsi: string;
  eid: string;
  activationCode: string;
  smdpAddress: string;
}

@Injectable()
export class ImportSimBatchCommand {
  private readonly outboxRepo = new OutboxRepository();

  constructor(
    private readonly prisma: PrismaService,
    private readonly simImportBatchRepo: SimImportBatchRepository,
  ) {}

  async execute(input: ImportSimBatchInput): Promise<SimImportBatchWithErrors> {
    const batchId = uuidv4();
    const lines = input.csvContent
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    // Skip header line
    const dataLines = lines.slice(1);
    const totalRecords = dataLines.length;
    let successCount = 0;
    let errorCount = 0;

    const result = await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Create batch with PROCESSING status
      await tx.simImportBatch.create({
        data: {
          id: batchId,
          supplier: input.supplier,
          fileName: input.fileName,
          simType: input.simType,
          totalRecords,
          status: ImportStatus.PROCESSING,
        },
      });

      for (let i = 0; i < dataLines.length; i++) {
        const rowNumber = i + 2; // +2 because we skipped header (row 1)
        const line = dataLines[i];
        const columns = line.split(',').map((c) => c.trim());

        try {
          if (input.simType === SimType.PHYSICAL) {
            const parsed = this.parsePhysicalSim(columns);
            if (!parsed) {
              throw new Error('Invalid PHYSICAL SIM row: missing required columns');
            }
            await tx.simCard.create({
              data: {
                id: uuidv4(),
                iccid: parsed.iccid,
                imsi: parsed.imsi || null,
                type: input.simType,
                supplier: input.supplier,
                importBatchId: batchId,
                formFactor: parsed.formFactor || null,
                pin: parsed.pin || null,
                puk: parsed.puk || null,
                warehouseLocation: parsed.warehouseLocation || null,
              },
            });
          } else {
            const parsed = this.parseEsim(columns);
            if (!parsed) {
              throw new Error('Invalid ESIM row: missing required columns');
            }
            await tx.simCard.create({
              data: {
                id: uuidv4(),
                iccid: parsed.iccid,
                imsi: parsed.imsi || null,
                type: input.simType,
                supplier: input.supplier,
                importBatchId: batchId,
                eid: parsed.eid || null,
                activationCode: parsed.activationCode || null,
                smdpAddress: parsed.smdpAddress || null,
              },
            });
          }
          successCount++;
        } catch (err) {
          errorCount++;
          await tx.simImportError.create({
            data: {
              id: uuidv4(),
              batchId,
              rowNumber,
              iccid: columns[0] || null,
              errorMessage: err instanceof Error ? err.message : 'Unknown error',
            },
          });
        }
      }

      const finalStatus =
        errorCount === 0
          ? ImportStatus.COMPLETED
          : successCount === 0
            ? ImportStatus.FAILED
            : ImportStatus.COMPLETED_WITH_ERRORS;

      await tx.simImportBatch.update({
        where: { id: batchId },
        data: {
          successCount,
          errorCount,
          status: finalStatus,
        },
      });

      await this.outboxRepo.create(tx, {
        aggregateId: batchId,
        aggregateType: 'SimImportBatch',
        eventType: SIM_EVENTS.BATCH_IMPORTED,
        payload: {
          batchId,
          supplier: input.supplier,
          fileName: input.fileName,
          simType: input.simType,
          totalRecords,
          successCount,
          errorCount,
        },
      });

      return batchId;
    });

    const batch = await this.simImportBatchRepo.findById(result);
    return batch!;
  }

  private parsePhysicalSim(columns: string[]): ParsedPhysicalSim | null {
    // iccid,imsi,form_factor,pin,puk,warehouse_location
    if (columns.length < 1 || !columns[0]) return null;
    return {
      iccid: columns[0],
      imsi: columns[1] ?? '',
      formFactor: columns[2] ?? '',
      pin: columns[3] ?? '',
      puk: columns[4] ?? '',
      warehouseLocation: columns[5] ?? '',
    };
  }

  private parseEsim(columns: string[]): ParsedEsim | null {
    // iccid,imsi,eid,activation_code,smdp_address
    if (columns.length < 1 || !columns[0]) return null;
    return {
      iccid: columns[0],
      imsi: columns[1] ?? '',
      eid: columns[2] ?? '',
      activationCode: columns[3] ?? '',
      smdpAddress: columns[4] ?? '',
    };
  }
}
