import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import Cors from "cors";

const cors = Cors({
  origin: "https://pmb-mobile-backend.vercel.app/api/login", // Update with your Ionic Angular app's origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Include if you're using cookies or authentication headers
});

const filePath = path.join(process.cwd(), "data", "students.json");
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res); // Menjalankan middleware CORS
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const students = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Find student by email
      const student = students.find((s: any) => s.email === email);

      if (!student || student.password !== password) {
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

export default handler;
