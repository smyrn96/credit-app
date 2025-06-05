import * as Yup from "yup";

export const stepSchemas = [
  Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    date: Yup.string()
      .required("Date of birth is required")
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        "Must be in DD-MM-YYYY format"
      )
      .test("is-valid-date", "Invalid date", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split("-").map(Number);

        const date = new Date(year, month - 1, day);

        const isValidDate =
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day;

        const isNotFuture = date <= new Date();

        return isValidDate && isNotFuture;
      }),
  }),
  Yup.object({
    income: Yup.string()
      .required("Income is required")
      .matches(/^\d+$/, "Income must be a valid number"),
    employmentType: Yup.string().required("Please select an employment status"),
    acceptTerms: Yup.boolean().oneOf(
      [true, false],
      "You must accept the terms and conditions"
    ),
  }),
];
