export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  color: "yellow" | "blue" | "green" | "orange" | "purple" | "gray" | "pink";
  status: "completed" | "in-progress" | "available" | "locked";
  prerequisites: string[];
  hasLab?: boolean;
}

export interface Semester {
  title: string;
  year: string;
  totalCredits: number;
  courses: Course[];
}

export const semesters: Semester[] = [
  {
    title: "1st Semester",
    year: "Freshman",
    totalCredits: 18,
    courses: [
      { id: "math101", code: "MATH 101", name: "Calculus I", credits: 4, color: "yellow", status: "completed", prerequisites: [] },
      { id: "engl101", code: "ENGL 101", name: "English Communication I", credits: 3, color: "blue", status: "completed", prerequisites: [] },
      { id: "ias121", code: "IAS 121", name: "Islamic Studies I", credits: 2, color: "gray", status: "completed", prerequisites: [] },
      { id: "phys101", code: "PHYS 101", name: "General Physics I", credits: 4, color: "purple", status: "completed", prerequisites: [], hasLab: true },
      { id: "ics104", code: "ICS 104", name: "Intro to Programming in Python", credits: 4, color: "green", status: "completed", prerequisites: [], hasLab: true },
      { id: "pe101", code: "PE 101", name: "Physical Education", credits: 1, color: "blue", status: "completed", prerequisites: [] },
    ],
  },
  {
    title: "2nd Semester",
    year: "Freshman",
    totalCredits: 17,
    courses: [
      { id: "math102", code: "MATH 102", name: "Calculus II", credits: 4, color: "yellow", status: "completed", prerequisites: ["math101"] },
      { id: "engl102", code: "ENGL 102", name: "English Communication II", credits: 3, color: "blue", status: "completed", prerequisites: ["engl101"] },
      { id: "ias111", code: "IAS 111", name: "Islamic Studies II", credits: 2, color: "gray", status: "completed", prerequisites: [] },
      { id: "phys102", code: "PHYS 102", name: "General Physics II", credits: 4, color: "purple", status: "completed", prerequisites: ["phys101"], hasLab: true },
      { id: "ics108", code: "ICS 108", name: "Object Oriented Programming", credits: 4, color: "orange", status: "completed", prerequisites: ["ics104"], hasLab: true },
    ],
  },
  {
    title: "1st Semester",
    year: "Sophomore",
    totalCredits: 17,
    courses: [
      { id: "math201", code: "MATH 201", name: "Calculus III", credits: 4, color: "yellow", status: "completed", prerequisites: ["math102"] },
      { id: "engl214", code: "ENGL 214", name: "Technical Report Writing", credits: 3, color: "blue", status: "completed", prerequisites: ["engl102"] },
      { id: "ias212", code: "IAS 212", name: "Islamic Studies III", credits: 2, color: "gray", status: "completed", prerequisites: [] },
      { id: "ics202", code: "ICS 202", name: "Data Structures", credits: 4, color: "orange", status: "in-progress", prerequisites: ["ics108"], hasLab: true },
      { id: "ise291", code: "ISE 291", name: "Engineering Management", credits: 4, color: "green", status: "in-progress", prerequisites: [] },
    ],
  },
  {
    title: "2nd Semester",
    year: "Sophomore",
    totalCredits: 17,
    courses: [
      { id: "math208", code: "MATH 208", name: "Discrete Mathematics", credits: 3, color: "yellow", status: "available", prerequisites: ["math102"] },
      { id: "ics253", code: "ICS 253", name: "Discrete Structures", credits: 3, color: "orange", status: "available", prerequisites: ["ics202", "math208"] },
      { id: "ics321", code: "ICS 321", name: "Algorithm Design & Analysis", credits: 3, color: "orange", status: "available", prerequisites: ["ics202", "math208"] },
      { id: "swe206", code: "SWE 206", name: "Intro to Software Engineering", credits: 3, color: "orange", status: "available", prerequisites: ["ics202"] },
      { id: "coe292", code: "COE 292", name: "Computer Organization", credits: 4, color: "green", status: "available", prerequisites: ["ics108"], hasLab: true },
      { id: "scxxx", code: "SC XXX", name: "Science Elective", credits: 3, color: "yellow", status: "available", prerequisites: [] },
    ],
  },
  {
    title: "1st Semester",
    year: "Junior",
    totalCredits: 16,
    courses: [
      { id: "stat201", code: "STAT 201", name: "Probability & Statistics", credits: 3, color: "yellow", status: "locked", prerequisites: ["math201"] },
      { id: "coe233", code: "COE 233", name: "Computer Organization & Assembly", credits: 4, color: "orange", status: "locked", prerequisites: ["coe292"], hasLab: true },
      { id: "ics343", code: "ICS 343", name: "Software Design & Architecture", credits: 3, color: "orange", status: "locked", prerequisites: ["swe206"] },
      { id: "swe316", code: "SWE 316", name: "Software Requirements Analysis", credits: 3, color: "orange", status: "locked", prerequisites: ["swe206"] },
      { id: "swe363", code: "SWE 363", name: "Web Engineering & Development", credits: 3, color: "orange", status: "locked", prerequisites: ["ics202"], hasLab: true },
    ],
  },
  {
    title: "2nd Semester",
    year: "Junior",
    totalCredits: 16,
    courses: [
      { id: "ics344", code: "ICS 344", name: "Software Quality Assurance", credits: 3, color: "orange", status: "locked", prerequisites: ["ics343"] },
      { id: "ics353", code: "ICS 353", name: "Database Systems", credits: 3, color: "orange", status: "locked", prerequisites: ["ics202"], hasLab: true },
      { id: "swe326", code: "SWE 326", name: "Software Project Management", credits: 3, color: "orange", status: "locked", prerequisites: ["swe206"] },
      { id: "swe387", code: "SWE 387", name: "Software Testing & Validation", credits: 3, color: "orange", status: "locked", prerequisites: ["swe206"], hasLab: true },
      { id: "bus200", code: "BUS 200", name: "Business Fundamentals", credits: 3, color: "green", status: "locked", prerequisites: [] },
      { id: "iasxxx", code: "IAS XXX", name: "Islamic Studies Elective", credits: 2, color: "gray", status: "locked", prerequisites: [] },
    ],
  },
  {
    title: "Summer",
    year: "Summer",
    totalCredits: 6,
    courses: [
      { id: "swe399", code: "SWE 399", name: "Internship/Co-op", credits: 3, color: "orange", status: "locked", prerequisites: ["junior-standing"] },
      { id: "cgs392", code: "CGS 392", name: "Practical Training", credits: 3, color: "pink", status: "locked", prerequisites: [] },
    ],
  },
  {
    title: "1st Semester",
    year: "Senior",
    totalCredits: 13,
    courses: [
      { id: "swe413", code: "SWE 413", name: "Software Architecture", credits: 3, color: "orange", status: "locked", prerequisites: ["ics343"] },
      { id: "swe414", code: "SWE 414", name: "Software Project I", credits: 3, color: "orange", status: "locked", prerequisites: ["ics343", "swe326"], hasLab: true },
      { id: "sweelec1", code: "SWE XXX", name: "SWE Elective I", credits: 3, color: "orange", status: "locked", prerequisites: [] },
      { id: "sweelec2", code: "SWE XXX", name: "SWE Elective II", credits: 3, color: "orange", status: "locked", prerequisites: [] },
      { id: "gsxxx", code: "GS XXX", name: "General Studies Elective", credits: 3, color: "pink", status: "locked", prerequisites: [] },
    ],
  },
  {
    title: "2nd Semester",
    year: "Senior",
    totalCredits: 12,
    courses: [
      { id: "swe439", code: "SWE 439", name: "Software Project II", credits: 3, color: "orange", status: "locked", prerequisites: ["swe414"], hasLab: true },
      { id: "sweelec3", code: "SWE XXX", name: "SWE Elective III", credits: 3, color: "orange", status: "locked", prerequisites: [] },
      { id: "sweelec4", code: "SWE XXX", name: "SWE Elective IV", credits: 3, color: "orange", status: "locked", prerequisites: [] },
      { id: "sweelec5", code: "SWE XXX", name: "SWE Elective V", credits: 3, color: "orange", status: "locked", prerequisites: [] },
    ],
  },
];

export const allCourses = semesters.flatMap((semester) => semester.courses);
