import type { Certification, EducationItem, EventItem } from "./schema";

export const education: readonly EducationItem[] = [
  {
    degree: "BS in Artificial Intelligence",
    institution: "The Islamia University of Bahawalpur",
    location: "Bahawalpur, Pakistan",
    start: "2020-08",
    end: "2024-07",
    grade: "CGPA 3.16",
  },
];

/** Newest first. */
export const certifications: readonly Certification[] = [
  { title: "Python for Data Science & AI Development", issuer: "IBM", date: "2026-04" },
  { title: "Machine Learning with Python", issuer: "IBM", date: "2026-04" },
  { title: "Supervised Machine Learning: Regression", issuer: "IBM", date: "2026-04" },
  { title: "Exploratory Data Analysis for Machine Learning", issuer: "IBM", date: "2026-04" },
  { title: "Generative AI: Prompt Engineering Basics", issuer: "IBM", date: "2026-04" },
  { title: "Python Essentials", issuer: "Cisco", date: "2024-10" },
  { title: "Digital Forensics & Cybersecurity", issuer: "NAVTTC", date: "2024-05" },
  { title: "Data Analytics & Business Intelligence", issuer: "DigiSkills", date: "2023-10" },
];

export const events: readonly EventItem[] = [
  {
    title: "AI Expo 23",
    host: "The Islamia University of Bahawalpur",
    date: "2023-01",
  },
  {
    title: "ICMPAI & AI Expo 22",
    host: "The Islamia University of Bahawalpur",
    date: "2022-06",
  },
  {
    title: "STEMS 2nd International Conference",
    host: "The Islamia University of Bahawalpur",
    date: "2022-03",
  },
];
