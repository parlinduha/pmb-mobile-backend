import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import NextCors from "nextjs-cors";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Invoking NextCors middleware inside the route handler
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const filePath = path.join(process.cwd(), "data", "students.json");

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
}

export default handler;
