import { NextApiRequest, NextApiResponse } from "next";
import { getPeoplesData, writePeoplesData } from "../../../utils/peopleUtils";
import NextCors from "nextjs-cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getValidEmails } from "../../../utils/studentsUtils";

// Extend NextApiRequest to include file property
interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "uploads"),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
  limits: { fileSize: 700 * 1024 }, // max file size 700KB
});

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const handler = async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    const students = await getPeoplesData();
    return res.status(200).json({
      success: true,
      message: "Data Found",
      data: students,
    });
  } else if (req.method === "POST") {
    try {
      await runMiddleware(req, res, upload.single("paymentProof"));

      if (!req.body.data) {
        throw new Error("No data found in request body");
      }

      const register = JSON.parse(req.body.data);

      let students = await getPeoplesData();

      const existingStudent = students.find(
        (student) => student.email === register.email
      );

      if (existingStudent) {
        return res.status(400).json({ error: "Email sudah terdaftar!" });
      }

      const validEmails = await getValidEmails();
      const validEmailData = validEmails.find(
        (emailData) => emailData.email === register.email
      );

      if (!validEmailData) {
        return res.status(400).json({ error: "Email belum terdaftar." });
      }

      const newStudent = {
        id: (students.length + 1).toString(),
        major1: register.major1,
        major2: register.major2,
        wavePeriod: register.wavePeriod,
        class: register.class,
        fullName: register.fullName,
        gender: register.gender,
        birthPlace: register.birthPlace,
        birthDate: register.birthDate,
        homePhoneAreaCode: register.homePhoneAreaCode,
        homePhoneNumber: register.homePhoneNumber,
        mobileNumber: register.mobileNumber,
        fullAddress: register.fullAddress,
        subDistrict: register.subDistrict,
        district: register.district,
        city: register.city,
        province: register.province,
        email: register.email,
        graduationYear: register.graduationYear,
        diplomaNumber: register.diplomaNumber,
        schoolOrigin: register.schoolOrigin,
        religion: register.religion,
        fatherName: register.fatherName,
        fatherAddress: register.fatherAddress,
        fatherOccupation: register.fatherOccupation,
        fatherMobileNumber: register.fatherMobileNumber,
        motherName: register.motherName,
        motherAddress: register.motherAddress,
        motherOccupation: register.motherOccupation,
        motherMobileNumber: register.motherMobileNumber,
        paymentProof: req.file ? req.file.filename : "", // Save file name if uploaded
      };

      students.push(newStudent);

      await writePeoplesData(students);

      return res.status(200).json({
        success: true,
        message: "Registrasi berhasil",
        data: newStudent,
      });
    } catch (err: any) {
      console.error("Error during data handling:", err.message);
      return res.status(500).json({ error: "Error processing data.", details: err.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
