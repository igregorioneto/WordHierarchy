import { PrismaWordHierarckyRepository } from "../../infra/repositories/PrismaWordHierarckyRepository";
import { WordHierarcky } from "../entities/WordHierarcky";

export class CreateWordHierarckyService {
  constructor(
    private readonly prismaWordHierarckyRepository: PrismaWordHierarckyRepository
  ) { }

  async execute(word: string, parentId?: number) {
    const wordHierarcky = new WordHierarcky({ word, parentId: parentId ?? undefined });
    await this.prismaWordHierarckyRepository.create(wordHierarcky);
  }
}