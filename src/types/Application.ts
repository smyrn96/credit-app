export type EmploymentType = "full-time" | "part-time" | "unemployed";

export type ApplicationType = {
  id?: number;
  fullName: string;
  email: string;
  date: string; // ISO 8601 format, e.g. "1990-07-25T00:00:00Z"
  employmentType: EmploymentType | null;
  income: string | null;
};
