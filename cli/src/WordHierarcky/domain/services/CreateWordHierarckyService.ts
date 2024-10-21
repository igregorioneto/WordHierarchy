import { createOrUpdateJsonFile } from "../../../shared/utils/createOrUpdateJsonFile";
import { PrismaWordHierarckyRepository } from "../../infra/repositories/PrismaWordHierarckyRepository";
import { WordHierarcky } from "../entities/WordHierarcky";

export class CreateWordHierarckyService {
  constructor(
    private readonly prismaWordHierarckyRepository: PrismaWordHierarckyRepository
  ) { }

  async execute(word: string, parentId: number | null) {
    const wordHierarcky = new WordHierarcky({ word, parentId });
    const data = await this.prismaWordHierarckyRepository.create(wordHierarcky);
    if (data) {
      createOrUpdateJsonFile(data);
    }
    return;
  }
}