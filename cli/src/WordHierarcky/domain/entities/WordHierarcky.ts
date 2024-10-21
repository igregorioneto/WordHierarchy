import { BaseEntity } from "../../../shared/domain/entities/BaseEntity";

export class WordHierarcky extends BaseEntity {
  word: string;
  parentId: number | null;
  children?:  WordHierarcky[];

  constructor(params: {
    id?: number;
    word: string;
    parentId: number | null;
    children?:  WordHierarcky[];
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    super({ id: params.id, createdAt: params.createdAt, updatedAt: params.updatedAt });
    this.word = params.word;
    this.parentId = params.parentId;
    this.children = params.children;
  }
}