import fs from "fs";
import path from "path";

const studentsFilePath = path.join(process.cwd(), "data", "students.json");

export const getStudentsData = (): any[] => {
  try {
    console.log("studentsFilePath:", studentsFilePath);
    const studentsData = fs.readFileSync(studentsFilePath, "utf-8");
    return JSON.parse(studentsData);
  } catch (error) {
    console.error("Error reading students.json:", error);
    return [];
  }
};

export const writeStudentsData = (studentsData: any[]): void => {
  try {
    fs.writeFileSync(
      studentsFilePath,
      JSON.stringify(studentsData, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing to students.json:", error);
  }
};

export const getValidEmails = (): any[] => {
  try {
    const jsonData = fs.readFileSync(studentsFilePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading validEmails.json:", error);
    return [];
  }
};