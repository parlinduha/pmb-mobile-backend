import { NextApiRequest, NextApiResponse } from 'next';
import { Maba } from '../../../interfaces';
import { getPeoplesData, writePeoplesData } from "../../../utils/peopleUtils";
import Cors from 'nextjs-cors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Maba | { message: string }>
) {
  await Cors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "DELETE"],
    origin: "*",
  });

  let informationData = await getPeoplesData();
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
    const updatedInfo: Maba = { ...informationData[infoIndex], ...req.body };
    informationData[infoIndex] = updatedInfo;
    await writePeoplesData(informationData);
    res.status(200).json(updatedInfo);
  } else if (req.method === 'DELETE') {
    // Delete information by id
    const deletedInfo = informationData.splice(infoIndex, 1);
    await writePeoplesData(informationData);
    res.status(200).json(deletedInfo[0]);
  } else {
    // Method not allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
