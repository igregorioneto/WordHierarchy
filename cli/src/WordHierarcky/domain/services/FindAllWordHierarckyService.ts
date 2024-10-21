import { WordHierarckyRepository } from "../ports/WordHierarckyRepository";

export class FindAllWordHierarckyService {
  constructor(private readonly wordHierarckyRepository: WordHierarckyRepository) { }

  async execute() {
    return await this.wordHierarckyRepository.findAll();
  }
}