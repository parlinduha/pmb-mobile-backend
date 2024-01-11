// pages/api/students.ts
import { NextApiRequest, NextApiResponse } from "next";
import {
  getStudentsData,
  writeStudentsData,
} from "../../../utils/studentsUtils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const students = getStudentsData();
    return res.status(200).json(students);
  } else if (req.method === "POST") {
    const register = req.body;
    let students = getStudentsData();

    const existingStudent = students.find(
      (student) => student.email === register.email
    );

    if (existingStudent) {
      return res.status(400).json({ error: "Email sudah terdaftar!" });
    }

    const newStudent = {
      id: students.length + 1,
      name: register.name,
      workStatus: register.workStatus || "",
      bornDate: register.bornDate || "",
      genderOption: register.genderOption || "",
      religionOption: register.religionOption || "",
      whatsappNumber: register.whatsappNumber || "",
      homeAddress: register.homeAddress || "",
      isRegister: false,
      avatar: "",
      password: register.password,
      role: "student",
    };

    students.push(newStudent);

    writeStudentsData(students);

    return res
      .status(200)
      .json({ success: true, message: "Registrasi berhasil" });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
