import fs from "fs";
import path from "path";

const studentsFilePath = path.join(process.cwd(), "data", "students.json");

export const getStudentsData = (): any[] => {
  try {
    const studentsData = JSON.parse(fs.readFileSync(studentsFilePath, "utf-8"));
    return studentsData;
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
