import { PrismaClient } from "@prisma/client";
import { WordHierarcky } from "../../domain/entities/WordHierarcky";
import { WordHierarckyRepository } from "../../domain/ports/WordHierarckyRepository";

const prisma = new PrismaClient();
export class PrismaWordHierarckyRepository implements WordHierarckyRepository {
  async create(wordHierarcky: WordHierarcky): Promise<WordHierarcky> {
    const word = await prisma.wordHierarcky.create({
      data: {
        word: wordHierarcky.word,
        parent: wordHierarcky.parentId
            ? { connect: { id: wordHierarcky.parentId } }
            : undefined
      },
      include: {
        children: true
      }
    });
    return new WordHierarcky({
      id: word.id,
      word: word.word,
      parentId: word.parentId,
      children: word.children
    });
  }

  async findAll(): Promise<WordHierarcky[]> {
    const words = await prisma.$queryRaw`
      WITH RECURSIVE word_hierarchy AS (
      SELECT
        id, word, "parentId"
      FROM
        "WordHierarcky"
      WHERE
        "parentId" IS NULL
      UNION ALL
      SELECT
        wh.id, wh.word, wh."parentId"
      FROM
        "WordHierarcky" wh
      INNER JOIN word_hierarchy ON wh."parentId" = word_hierarchy.id
    )
    SELECT * FROM word_hierarchy;
    ` as any;

    const buildTree = (words: any[], parentId: number | null = null): WordHierarcky[] => {
      return words
        .filter((word: any) => word.parentId === parentId)
        .map((word: any) => (new WordHierarcky({
          id: word.id,
          word: word.id,
          parentId: word.parentId,
          children: buildTree(words, word.id)
        })));
    }

    const wordTree = buildTree(words);

    return wordTree.map((word: any) =>
      new WordHierarcky({
        id: word.id,
        word: word.word,
        parentId: word.parentId,
        children: word.children
      })
    );
  }
}