import { NextApiResponse, NextApiRequest } from 'next'
import { information, persyaratan, perkuliahan, prosedure, jadwalBiaya } from '../../../data'
import { Information, Persyaratan, Perkuliahan, Prosedure, JadwalBiaya } from '../../../interfaces'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{
    information: Information[],
    persyaratan: Persyaratan[],
    perkuliahan: Perkuliahan[],
    prosedure: Prosedure[],
    jadwalBiaya: JadwalBiaya[]
  }>
) {
  return res.status(200).json({
    information,
    persyaratan,
    perkuliahan,
    prosedure,
    jadwalBiaya
  });
}
