import { WordHierarcky } from "../entities/WordHierarcky";

export interface WordHierarckyRepository {
  create(wordHierarcky: WordHierarcky): Promise<WordHierarcky>;
  findAll(): Promise<WordHierarcky[]>;
}