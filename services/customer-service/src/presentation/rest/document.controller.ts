import {
  Controller,
  Post,
  Patch,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddDocumentCommand } from '../../application/commands/add-document.command';
import { VerifyDocumentCommand } from '../../application/commands/verify-document.command';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentResponseDto } from '../dto/customer-response.dto';

@ApiTags('Customer Documents')
@Controller('customers/:customerId/documents')
export class DocumentController {
  constructor(
    private readonly addDocument: AddDocumentCommand,
    private readonly verifyDocument: VerifyDocumentCommand,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar documento ao cliente' })
  @ApiResponse({ status: 201, type: DocumentResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente nao encontrado' })
  async create(
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Body() dto: CreateDocumentDto,
  ) {
    return this.addDocument.execute(customerId, dto);
  }

  @Patch(':documentId/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verificar documento' })
  @ApiResponse({ status: 200, type: DocumentResponseDto })
  @ApiResponse({ status: 404, description: 'Documento nao encontrado' })
  async verify(
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Param('documentId', ParseUUIDPipe) documentId: string,
  ) {
    return this.verifyDocument.execute(customerId, documentId);
  }
}
