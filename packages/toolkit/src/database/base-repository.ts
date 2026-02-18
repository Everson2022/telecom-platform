/**
 * BasePrismaClient: minimal interface for dynamic model access by name.
 * Services use concrete repositories with fully-typed Prisma methods.
 * This class exists for optional use when a simple CRUD base is sufficient.
 */
export interface BasePrismaClient {
  [model: string]: {
    findUnique(args: { where: { id: string } }): Promise<unknown>;
    create(args: { data: unknown }): Promise<unknown>;
    update(args: { where: { id: string }; data: unknown }): Promise<unknown>;
    delete(args: { where: { id: string } }): Promise<unknown>;
    count(args: { where: { id: string } }): Promise<number>;
  };
}

export abstract class BaseRepository<T, CreateInput, UpdateInput> {
  protected abstract readonly modelName: string;

  constructor(protected readonly prisma: BasePrismaClient) {}

  async findById(id: string, tx?: BasePrismaClient): Promise<T | null> {
    const client = tx ?? this.prisma;
    return client[this.modelName].findUnique({ where: { id } }) as Promise<T | null>;
  }

  async create(data: CreateInput, tx?: BasePrismaClient): Promise<T> {
    const client = tx ?? this.prisma;
    return client[this.modelName].create({ data }) as Promise<T>;
  }

  async update(id: string, data: UpdateInput, tx?: BasePrismaClient): Promise<T> {
    const client = tx ?? this.prisma;
    return client[this.modelName].update({ where: { id }, data }) as Promise<T>;
  }

  async delete(id: string, tx?: BasePrismaClient): Promise<T> {
    const client = tx ?? this.prisma;
    return client[this.modelName].delete({ where: { id } }) as Promise<T>;
  }

  async exists(id: string, tx?: BasePrismaClient): Promise<boolean> {
    const client = tx ?? this.prisma;
    const count = await client[this.modelName].count({ where: { id } });
    return count > 0;
  }
}
