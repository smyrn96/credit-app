import MainLayout from "../components/MainLayout";
import BackButton from "../assets/icons/back_button.svg";

const NewApplication = () => {
  const headerText = "Personal Info";
  const buttonText = "Continue";

  return (
    <>
      <MainLayout
        headerText={headerText}
        buttonText={buttonText}
        isDisabledButton={false}
        Icon={BackButton}
        buttonAction={() => console.log("hello there")}
      >
        <div>Hello there</div>
      </MainLayout>
    </>
  );
};

export default NewApplication;
