import { NextApiRequest, NextApiResponse } from "next";
import Cors from "micro-cors";
import fs from "fs";
import path from "path";

const cors = Cors({
  allowMethods: ["POST"],
  origin: "https://pmb-mobile-backend.vercel.app", // Update with the actual origin of your Angular app
});

const filePath = path.join(process.cwd(), "data", "students.json");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const students = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Find student by email
      const student = students.find((s: any) => s.email === req.body.email);

      if (!student || student.password !== req.body.password) {
        // If student not found or password doesn't match, return an error
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // If login is successful, return student data with a message
      return res.status(200).json({
        message: "Login successful",
        data: { student },
      });
    } catch (error) {
      // Handle file read error
      console.error("Error reading students JSON file:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // If the request method is not POST, return an error
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default cors(handler);
