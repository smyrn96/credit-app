import MainLayout from "../components/Layout/MainLayout";
import { useState } from "react";
import BackButton from "../assets/icons/back_button.svg";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "../components/Form/PersonalInfo";
import Finances from "../components/Form/Finances";

const NewApplication = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const incrementStep = () => {
    setStep(step + 1);
  };

  const decrementStep = () => {
    setStep(step - 1);
  };

  const StepsData = [
    {
      //step1
      headerText: "Personal Info",
      buttonText: "Continue",
    },
    {
      //step2
      headerText: "Finances",
      buttonText: "Submit",
      Icon: BackButton,
      iconAction: () => decrementStep(),
    },
    {
      //step3
      headerText: "",
      buttonText: "View Applications",
      contentTitle: "Congratulations !!!",
      contentSubTitle: "Your applications has been accepted!",
      buttonAction: () => {
        navigate("/applications");
      },
    },
  ];

  const {
    buttonText,
    headerText,
    Icon,
    iconAction,
    contentTitle,
    contentSubTitle,
    buttonAction,
  } = StepsData[step];

  return (
    <MainLayout
      headerText={headerText}
      buttonText={buttonText}
      isDisabledButton={false}
      Icon={Icon}
      iconAction={iconAction}
      buttonAction={buttonAction}
    >
      {step === 0 && (
        <PersonalInfo
          buttonAction={() => incrementStep()}
          buttonText={buttonText}
        />
      )}
      {step === 1 && (
        <Finances
          buttonAction={() => incrementStep()}
          buttonText={buttonText}
        />
      )}
      {step === 2 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] font-bold text-[var(--black-color)]">
            {contentTitle}
          </h2>
          <div className="font-semibold text-xl text-[var(--black-color)]">
            {contentSubTitle}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default NewApplication;
