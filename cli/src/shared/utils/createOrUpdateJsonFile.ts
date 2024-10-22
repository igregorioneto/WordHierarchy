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
          id: word.id,
          word: word.word,
          parentId: word.parentId,
          children: buildTree(words, word.id)
        }));
  }

  const updateOrAddWord = (data: any[], wordHierarchy: WordHierarcky) => {
    const wordIndex = data.findIndex((word: any) => word.id === wordHierarchy.id);
    console.log('Data antes de atualizar/adicionar:', JSON.stringify(data, null, 2))
    if (wordIndex !== -1) {
      console.log('Atualizando palavra existente com ID:', wordHierarchy.id);
      data[wordIndex] = { ...data[wordIndex], ...wordHierarchy };
    } else {
      console.log('Adicionando nova palavra:', wordHierarchy.word);
      data.push({
        id: wordHierarchy.id,
        word: wordHierarchy.word,
        parentId: wordHierarchy.parentId,
        children: []
      })
    }
    console.log('Data após atualizar/adicionar:', JSON.stringify(data, null, 2));
  }

  updateOrAddWord(data, wordHierarcky);
  const treeData = buildTree(data);
  console.log('Dados da árvore gerados:', JSON.stringify(treeData, null, 2));
  try {
    const updateJson = JSON.stringify(treeData, null, 2);
    await fs.writeFile(filePath, updateJson, 'utf-8');
    console.log('Arquivo JSON atualizado com sucesso!')
  } catch (error) {
    console.error('Erro ao atualizar o arquivo JSON', error);
  }
}