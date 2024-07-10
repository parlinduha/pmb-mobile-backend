import { NextApiRequest, NextApiResponse } from "next";
import {
  getStudentsData,
  writeStudentsData,
} from "../../../utils/studentsUtils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, email } = req.query;

  if (!id && !email) {
    return res.status(400).json({ error: "Invalid ID or email" });
  }

  const studentId = id ? Number(id) : undefined;
  const studentEmail = email ? String(email) : undefined;

  if (req.method === "GET") {
    // GET student by ID or email
    const students = getStudentsData();
    const student = students.find(
      (s) => s.id === studentId || s.email === studentEmail
    );

    if (student) {
      return res.status(200).json(student);
    } else {
      return res.status(404).json({ error: "Student not found" });
    }
  } else if (req.method === "PUT") {
    // Update student by ID or email
    const students = getStudentsData();
    const index = students.findIndex(
      (s) => s.id === studentId || s.email === studentEmail
    );

    if (index !== -1) {
      const updatedStudent = { ...students[index], ...req.body };
      students[index] = updatedStudent;
      writeStudentsData(students);
      return res.status(200).json({ success: true, message: "Student updated successfully" });
    } else {
      return res.status(404).json({ error: "Student not found" });
    }
  } else if (req.method === "DELETE") {
    // Delete student by ID or email
    const students = getStudentsData();
    const index = students.findIndex(
      (s) => s.id === studentId || s.email === studentEmail
    );

    if (index !== -1) {
      students.splice(index, 1);
      writeStudentsData(students);
      return res.status(200).json({ success: true, message: "Student deleted successfully" });
    } else {
      return res.status(404).json({ error: "Student not found" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
