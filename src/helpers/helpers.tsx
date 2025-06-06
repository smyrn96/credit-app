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
