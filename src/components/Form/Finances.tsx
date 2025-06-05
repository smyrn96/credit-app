import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContextProvider } from "../../context/constants";
import { stepSchemas } from "../../schemas/FormSchema";
import MainButton from "../Buttons/MainButton";
import type { EmploymentType } from "../../types/Application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication } from "../../api/services/application.services";

type FinancesProps = {
  buttonText: string;
  buttonAction: () => void;
};

const Finances: React.FC<FinancesProps> = ({ buttonText, buttonAction }) => {
  const context = useContextProvider();
  const { data, setData } = context;
  const { income, employmentType } = data;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      buttonAction();
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => {
      console.log("Error creating a new application");
    },
  });

  const { mutate } = mutation;

  const submitHandler = (values: {
    income: string;
    employmentType: string;
  }) => {
    const { income: incomeInput, employmentType: emplymentTypeInput } = values;
    const requestData = {
      ...data,
      income: incomeInput,
      employmentType: emplymentTypeInput as EmploymentType,
    };

    mutate(requestData);

    setData(requestData);
  };

  return (
    <Formik
      initialValues={{
        income: income ?? "",
        employmentType: employmentType ?? "",
        acceptTerms: false,
      }}
      validationSchema={stepSchemas[1]}
      onSubmit={submitHandler}
    >
      {({ isSubmitting, isValid, dirty, values }) => {
        const isButtonDisabled =
          isSubmitting || !isValid || !dirty || !values.acceptTerms;
        return (
          <Form
            className="mt-4 flex flex-col justify-between pb-6"
            style={{ height: "calc(100% - 2.5rem)" }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="income"
                  className="text-base font-semibold text-[var(--black-color)]"
                >
                  Income
                </label>
                <Field
                  name="income"
                  type="text"
                  placeholder="Your monthly net income"
                  className="w-full border-[2px] border-[var(--secondary-color)] px-[16px] py-[12px] rounded-lg custom-placeholder"
                />
                <ErrorMessage
                  name="income"
                  component="div"
                  className="text-[var(--red-color)] text-[13px] font-normal"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-base font-semibold text-[var(--black-color)]">
                  Employment Status
                </label>

                <label className="flex flex-row gap-2 items-center">
                  <Field
                    type="radio"
                    name="employmentType"
                    value="Full time"
                    className="w-[14px] h-[14px] text-[var(--black-color)]"
                  />
                  Full time
                </label>

                <label className="flex flex-row gap-2 items-center">
                  <Field
                    type="radio"
                    name="employmentType"
                    value="Part time"
                    className="w-[14px] h-[14px] text-[var(--black-color)]"
                  />
                  Part time
                </label>

                <label className="flex flex-row gap-2 items-center">
                  <Field
                    type="radio"
                    name="employmentType"
                    value="Unemployed"
                    className="w-[14px] h-[14px] text-[var(--black-color)]"
                  />
                  Unemployed
                </label>

                <ErrorMessage
                  name="employmentType"
                  component="div"
                  className="text-[var(--red-color)] text-[13px] font-normal"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="acceptTerms"
                  className="w-[14px] w-[14px] text-[var(--black-color)] rounded-sm"
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-base text-[var(--black-color)] font-medium"
                >
                  I accept the terms and conditions
                </label>
              </div>
              <ErrorMessage
                name="acceptTerms"
                component="div"
                className="text-[var(--red-color)] text-[13px] font-normal"
              />

              <MainButton
                buttonType="submit"
                isDisabledButton={isButtonDisabled}
                buttonText={buttonText}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Finances;
