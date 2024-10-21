export class BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: { id?: number; createdAt?: Date; updatedAt?: Date }) {
    this.id = params.id || 0;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }
}