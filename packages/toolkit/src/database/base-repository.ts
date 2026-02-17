import { PrismaTransaction } from './unit-of-work';

export abstract class BaseRepository<T, CreateInput, UpdateInput> {
  protected abstract readonly modelName: string;

  constructor(protected readonly prisma: any) {}

  async findById(id: string, tx?: PrismaTransaction): Promise<T | null> {
    const client = tx ?? this.prisma;
    return client[this.modelName].findUnique({ where: { id } });
  }

  async create(data: CreateInput, tx?: PrismaTransaction): Promise<T> {
    const client = tx ?? this.prisma;
    return client[this.modelName].create({ data });
  }

  async update(id: string, data: UpdateInput, tx?: PrismaTransaction): Promise<T> {
    const client = tx ?? this.prisma;
    return client[this.modelName].update({ where: { id }, data });
  }

  async delete(id: string, tx?: PrismaTransaction): Promise<T> {
    const client = tx ?? this.prisma;
    return client[this.modelName].delete({ where: { id } });
  }

  async exists(id: string, tx?: PrismaTransaction): Promise<boolean> {
    const client = tx ?? this.prisma;
    const count = await client[this.modelName].count({ where: { id } });
    return count > 0;
  }
}
