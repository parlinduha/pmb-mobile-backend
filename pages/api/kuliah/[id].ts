import { NextApiRequest, NextApiResponse } from 'next';
import { Perkuliahan } from '../../../interfaces';
import { readData, writeData } from '../../../utils/kuliah';
import Cors from 'nextjs-cors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Perkuliahan | { message: string }>
) {
  await Cors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "DELETE"],
    origin: "*",
  });

  let informationData = await readData();
  const { id } = req.query;
  const infoIndex = informationData.findIndex((info:any) => info.id === id);

  if (infoIndex === -1) {
    return res.status(404).json({ message: `Information with id: ${id} not found.` });
  }

  if (req.method === 'GET') {
    // Get information by id
    res.status(200).json(informationData[infoIndex]);
  } else if (req.method === 'PUT') {
    // Update information by id
    const updatedInfo: Perkuliahan = { ...informationData[infoIndex], ...req.body };
    informationData[infoIndex] = updatedInfo;
    await writeData(informationData);
    res.status(200).json(updatedInfo);
  } else if (req.method === 'DELETE') {
    // Delete information by id
    const deletedInfo = informationData.splice(infoIndex, 1);
    await writeData(informationData);
    res.status(200).json(deletedInfo[0]);
  } else {
    // Method not allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
