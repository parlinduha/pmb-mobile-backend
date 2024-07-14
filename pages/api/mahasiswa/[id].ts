import { NextApiRequest, NextApiResponse } from "next";
import { getPeoplesData, writePeoplesData } from "../../../utils/peopleUtils";
import Cors from 'nextjs-cors';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, email } = req.query;

  if (!id && !email) {
    return res.status(400).json({ error: "Invalid ID or email" });
  }

  const studentId = id ? Number(id) : undefined;
  const studentEmail = email ? String(email) : undefined;

  if (req.method === "GET") {
    // GET student by ID or email
    const students = getPeoplesData();
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
    try {
      const students = getPeoplesData();
      const index = students.findIndex(
        (s) => s.id === studentId || s.email === studentEmail
      );

      if (index !== -1) {
        const updatedStudent = { ...students[index], ...req.body };
        students[index] = updatedStudent;
        writePeoplesData(students);
        return res.status(200).json({ success: true, message: "Student updated successfully", data: updatedStudent });
      } else {
        return res.status(404).json({ error: "Student not found" });
      }
    } catch (err:any) {
      console.error("Error during data handling:", err.message);
      return res.status(500).json({ error: "Error processing data.", details: err.message });
    }
  } else if (req.method === "DELETE") {
    // Delete student by ID or email
    try {
      const students = getPeoplesData();
      const index = students.findIndex(
        (s) => s.id === studentId || s.email === studentEmail
      );

      if (index !== -1) {
        students.splice(index, 1);
        writePeoplesData(students);
        return res.status(200).json({ success: true, message: "Student deleted successfully" });
      } else {
        return res.status(404).json({ error: "Student not found" });
      }
    } catch (err:any) {
      console.error("Error during data handling:", err.message);
      return res.status(500).json({ error: "Error processing data.", details: err.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
