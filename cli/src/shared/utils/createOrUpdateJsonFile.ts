import { WordHierarcky } from "@prisma/client";
import { file, write } from "bun";
import { existsSync } from "fs";

export async function createOrUpdateJsonFile(wordHierarcky: WordHierarcky) {
  // dicts
  const filePath = `../../../dicts/words.json`;
  let data: WordHierarcky[] = [];
  if (existsSync(filePath)) {
    try {
      const fileContent = await file(filePath).text();
      data = JSON.parse(fileContent);
    } catch (error) {
      console.error('Erro ao ler o arquivo JSON', error);
    }
  }

  const existingDataIndex = data.findIndex(d => d.id === wordHierarcky.id);
  if (existingDataIndex !== -1) {
    data[existingDataIndex] = { ...data[existingDataIndex], ...wordHierarcky };
  } else {
    data.push(wordHierarcky);
  }

  try {
    const updateJson = JSON.stringify(data, null, 2);
    await write(filePath, updateJson);
  } catch (error) {
    console.error('Erro ao atualizar o arquivo JSON', error);
  }
}