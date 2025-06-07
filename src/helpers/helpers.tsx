import type { EmploymentType } from "../types/Application";

export const dateToISO = (input: string) => {
  const [day, month, year] = input.split("-").map(Number);
  const utcDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day))
  );
  const isoString = utcDate.toISOString();

  return isoString;
};

export const isoToDate = (input: string) => {
  if (input) {
    const date = new Date(input);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  return "";
};

export const isDDMMYYYYFormat = (dateStr: string): boolean => {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  return regex.test(dateStr);
};

export const isInitalState = (initialState: {
  fullName: string;
  email: string;
  date: string;
}): boolean => {
  const { fullName, date, email } = initialState;
  return fullName === "" && date === "" && email === "";
};

export const employmentTypeToText = (emplType: EmploymentType | "") => {
  if (emplType === "") return emplType;
  if (emplType === "unemployed")
    return emplType.charAt(0).toUpperCase() + emplType.slice(1);

  const replaced = emplType.replace(/-/g, " ");
  const result = replaced.charAt(0).toUpperCase() + replaced.slice(1);

  return result;
};
