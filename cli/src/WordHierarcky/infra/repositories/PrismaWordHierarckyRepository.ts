import { PrismaClient } from "@prisma/client";
import { WordHierarcky } from "../../domain/entities/WordHierarcky";
import { WordHierarckyRepository } from "../../domain/ports/WordHierarckyRepository";

const prisma = new PrismaClient();
export class PrismaWordHierarckyRepository implements WordHierarckyRepository {
  async create(wordHierarcky: WordHierarcky): Promise<void> {
    await prisma.wordHierarcky.create({
      data: {
        word: wordHierarcky.word,
        parent: wordHierarcky.parentId
            ? { connect: { id: wordHierarcky.parentId } }
            : undefined
      }
    });
  }

  async findAll(): Promise<WordHierarcky[]> {
    const words = await prisma.wordHierarcky.findMany();
    const wordsData =  words.map(word =>
      new WordHierarcky({ 
        id: word.id, 
        word: word.word, 
        parentId: word.parentId || undefined 
      })
    );
    return wordsData;
  }
}