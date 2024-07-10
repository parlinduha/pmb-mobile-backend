import { NextApiRequest, NextApiResponse } from "next";
import { getStudentsData, writeStudentsData } from "../../../utils/studentsUtils";
import NextCors from "nextjs-cors";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Initialize CORS middleware using nextjs-cors
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    const students = await getStudentsData();
    return res.status(200).json({
      success: true,
      message: "Data Found",
      data: students,
    });
  } else if (req.method === "POST") {
    const register = req.body;
    let students = await getStudentsData();

    const existingStudent = students.find(
      (student) => student.email === register.email
    );

    if (existingStudent) {
      return res.status(400).json({ error: "Email sudah terdaftar!" });
    }

    const newStudent = {
      id: students.length + 1,
      name: register.name,
      email: register.email,
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

    console.log("Register object: ", register);
    console.log("New student object: ", newStudent);

    students.push(newStudent);

    writeStudentsData(students);

    return res.status(200).json({
      success: true,
      message: "Registrasi berhasil",
      data: newStudent,
    });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default handler;
