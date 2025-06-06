import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../../api/services/application.services";
import Card from "../../components/Card/Card";
import { ClipLoader } from "react-spinners";

const Applications = () => {
  const navigate = useNavigate();
  const headerText = "Applications";
  const buttonText = "Apply Again";

  const { data: applicationsArray, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
    select: (response) => response.data,
  });

  return (
    <MainLayout
      headerText={headerText}
      buttonText={buttonText}
      isDisabledButton={false}
      buttonAction={() => {
        navigate("/applications/new");
      }}
    >
      <div className="mt-4 ">
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <ClipLoader
              color={"var(--success-color)"}
              loading={isLoading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {applicationsArray?.map((application) => (
          <Card application={application} key={application.id} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Applications;
