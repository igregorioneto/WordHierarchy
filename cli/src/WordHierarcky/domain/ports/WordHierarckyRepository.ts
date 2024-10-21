import { WordHierarcky } from "../entities/WordHierarcky";

export interface WordHierarckyRepository {
  create(wordHierarcky: WordHierarcky): Promise<void>;
  findAll(): Promise<WordHierarcky[]>;
}