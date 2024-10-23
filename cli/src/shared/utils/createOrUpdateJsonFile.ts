import { WordHierarcky } from "@prisma/client";
import { file, write } from "bun";
import { existsSync, promises as fs } from "fs";
import path from "path";

export async function createOrUpdateJsonFile(wordHierarcky: WordHierarcky) {
  // dicts
  const filePath = path.resolve(__dirname, '../../../dicts/words.json');
  let data: any[] = [];
  if (existsSync(filePath)) {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (error) {
      console.error('Erro ao ler o arquivo JSON', error);
    }
  }

  const buildTree = (words: any[], parentId: number | null = null): any => {
    return words
      .filter((word: any) => word.parentId === parentId)
      .map((word: any) => ({
          ...word,
          children: buildTree(words, word.id)
        }));
  }

  const updateOrAddWord = (data: any[], wordHierarchy: WordHierarcky) => {
    const wordIndex = data.findIndex((word: any) => word.id === wordHierarchy.id);
    if (wordIndex !== -1) {
      data[wordIndex] = { ...data[wordIndex], ...wordHierarchy };
    } else {
      const newWord = {
        id: wordHierarchy.id,
        word: wordHierarchy.word,
        parentId: wordHierarchy.parentId,
        children: []
      };
      data.push(newWord);
      if (wordHierarchy.parentId !== null) {
        const parentIndex = data.findIndex((word: any) => word.id === wordHierarchy.parentId);
        if (parentIndex !== -1) {
          data[parentIndex].children.push(newWord);
        }
      }
    }
  }

  updateOrAddWord(data, wordHierarcky);
  const treeData = buildTree(data);
  try {
    const updateJson = JSON.stringify(treeData, null, 2);
    await fs.writeFile(filePath, updateJson, 'utf-8');
  } catch (error) {
    console.error('Erro ao atualizar o arquivo JSON', error);
  }
}