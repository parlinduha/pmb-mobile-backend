import fs from "fs";
import path from "path";

const peoplesFilePath = path.join(process.cwd(), "data", "people.json");

export const getPeoplesData = (): any[] => {
  try {
    console.log("studentsFilePath:", peoplesFilePath );
    const studentsData = fs.readFileSync(peoplesFilePath , "utf-8");
    return JSON.parse(studentsData);
  } catch (error) {
    console.error("Error reading students.json:", error);
    return [];
  }
};

export const writePeoplesData = (studentsData: any[]): void => {
  try {
    fs.writeFileSync(
      peoplesFilePath ,
      JSON.stringify(studentsData, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing to students.json:", error);
  }
};
