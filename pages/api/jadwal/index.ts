import { NextApiRequest, NextApiResponse } from 'next';
import { JadwalBiaya } from '../../../interfaces';
import { readData, writeData } from '../../../utils/jadwal';
import NextCors from 'nextjs-cors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JadwalBiaya[] | JadwalBiaya | { message: string }>
) {
  // Handle CORS first
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  let informationData = await readData();

  if (req.method === 'GET') {
    // Get all information
    res.status(200).json(informationData);
  } else if (req.method === 'POST') {
    // Add new information
    const newInfo: JadwalBiaya = req.body;
    newInfo.id = (informationData.length ? Math.max(...informationData.map((info: any) => parseInt(info.id))) + 1 : 1).toString();
    informationData.push(newInfo);
    await writeData(informationData);
    res.status(201).json(newInfo);
  } else if (req.method === 'OPTIONS') {
    // Preflight request
    res.status(200).end();
  } else {
    // Method not allowed
    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
