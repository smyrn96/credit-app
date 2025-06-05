import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContextProvider } from "../../context/constants";
import { stepSchemas } from "../../schemas/FormSchema";
import MainButton from "../Buttons/MainButton";
import { dateToISO, isDDMMYYYYFormat, isoToDate } from "../../helpers/helpers";

type PersonalInfoProps = {
  buttonText: string;
  buttonAction: () => void;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  buttonText,
  buttonAction,
}) => {
  const context = useContextProvider();
  const { data, setData } = context;
  const { fullName, email, date } = data;

  const submitHandler = (values: {
    fullName: string;
    email: string;
    date: string;
  }) => {
    const {
      email: emailInput,
      fullName: fullNameInput,
      date: dateInput,
    } = values;

    const dateFormated = dateToISO(dateInput);
    setData({
      ...data,
      date: dateFormated,
      email: emailInput,
      fullName: fullNameInput,
    });

    buttonAction();
  };

  return (
    <Formik
      initialValues={{
        fullName: fullName,
        email: email,
        date: isDDMMYYYYFormat(date) ? date : isoToDate(date),
      }}
      validationSchema={stepSchemas[0]}
      onSubmit={submitHandler}
    >
      {({ isSubmitting, isValid, dirty }) => {
        const isButtonDisabled = isSubmitting || !isValid || !dirty;
        return (
          <Form
            className="mt-4 flex flex-col justify-between pb-6"
            style={{ height: "calc(100% - 2.5rem)" }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="text-base font-semibold text-[var(--black-color)]"
                >
                  Full Name
                </label>
                <Field
                  name="fullName"
                  type="text"
                  placeholder="Jane Smith"
                  className="w-full border-[2px] border-[var(--secondary-color)] px-[16px] py-[12px] rounded-lg custom-placeholder"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-[var(--red-color)] text-[13px] font-normal"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-base font-semibold text-[var(--black-color)]"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="jane.smith@mail.com"
                  className="w-full border-[2px] border-[var(--secondary-color)] px-[16px] py-[12px] rounded-lg custom-placeholder"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-[var(--red-color)] text-[13px] font-normal"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="date"
                  className="text-base font-semibold text-[var(--black-color)]"
                >
                  Date of Birth
                </label>
                <Field
                  name="date"
                  type="text"
                  placeholder="30-10-2000"
                  className="w-full border-[2px] border-[var(--secondary-color)] px-[16px] py-[12px] rounded-lg custom-placeholder"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-[var(--red-color)] text-[13px] font-normal"
                />
              </div>
            </div>

            <MainButton
              buttonType="submit"
              isDisabledButton={isButtonDisabled}
              buttonText={buttonText}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalInfo;
