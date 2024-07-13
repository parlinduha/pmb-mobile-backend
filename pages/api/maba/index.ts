import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.resolve(process.cwd(), 'data/people.json');

export type Person = {
  id: string;
  major1: string;
  major2?: string;
  wavePeriod: string;
  class: string;
  fullName: string;
  gender: string;
  birthPlace: string;
  birthDate: string;
  homePhoneAreaCode?: string;
  homePhoneNumber?: string;
  mobileNumber: string;
  fullAddress: string;
  subDistrict: string;
  district: string;
  city: string;
  province: string;
  email: string;
  graduationYear?: string;
  diplomaNumber?: string;
  schoolOrigin: string;
  religion: string;
  fatherName: string;
  fatherAddress?: string;
  fatherOccupation: string;
  fatherMobileNumber?: string;
  motherName: string;
  motherAddress?: string;
  motherOccupation: string;
  motherMobileNumber?: string;
  paymentProof: string;
};

export type ResponseError = {
  message: string;
};

// Helper functions
const readData = async (): Promise<Person[]> => {
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (data: Person[]): Promise<void> => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Person[] | Person | ResponseError>
) {
  try {
    let people = await readData();

    switch (req.method) {
      case 'GET':
        return res.status(200).json(people);

      case 'POST':
        const newPerson: Person = req.body;
        if (!newPerson.id) {
          return res.status(400).json({ message: "ID is required" });
        }
        people.push(newPerson);
        await writeData(people);
        return res.status(201).json(newPerson);

      case 'PUT':
        const updatedPerson: Person = req.body;
        const index = people.findIndex(person => person.id === updatedPerson.id);
        if (index === -1) {
          return res.status(404).json({ message: "Person not found" });
        }
        people[index] = updatedPerson;
        await writeData(people);
        return res.status(200).json(updatedPerson);

      case 'DELETE':
        const { id } = req.query;
        const personIndex = people.findIndex(person => person.id === id);
        if (personIndex === -1) {
          return res.status(404).json({ message: "Person not found" });
        }
        const deletedPerson = people.splice(personIndex, 1);
        await writeData(people);
        return res.status(200).json(deletedPerson[0]);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
