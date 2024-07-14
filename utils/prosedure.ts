import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'prosedure.json');

export const readData = async () => {
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

export const writeData = async (data:any) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};
