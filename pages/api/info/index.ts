import { NextApiRequest, NextApiResponse } from 'next';
import { Information } from '../../../interfaces';
import { readData, writeData } from '../../../utils/fsUtils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Information[] | Information | { message: string }>
) {
  let informationData = await readData();

  if (req.method === 'GET') {
    // Get all information
    res.status(200).json(informationData);
  } else if (req.method === 'POST') {
    // Add new information
    const newInfo: Information = req.body;
    newInfo.id = (informationData.length ? Math.max(...informationData.map((info:any) => parseInt(info.id))) + 1 : 1).toString();
    informationData.push(newInfo);
    await writeData(informationData);
    res.status(201).json(newInfo);
  } else {
    // Method not allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
