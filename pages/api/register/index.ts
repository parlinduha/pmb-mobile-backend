import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const register = req.body;
    const filePath = path.join(process.cwd(), "data", "students.json");
    let students: any[] = [];

    try {
      students = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }

    const existingStudent = students.find(
      (student) => student.email === register.email
    );

    if (existingStudent) {
      res.status(400).json({ error: "Email sudah terdaftar!" });
    } else {
      students.push(register);

      try {
        fs.writeFileSync(filePath, JSON.stringify(students, null, 2), "utf-8");
        res.status(200).json({ success: true, message: "Registrasi berhasil" });
      } catch (error) {
        console.error("Error writing to JSON file:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
