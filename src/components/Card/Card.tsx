import type { ApplicationType } from "../../types/Application";
import TrashIcon from "../../assets/icons/trash.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../api/services/application.services";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { employmentTypeToText } from "../../helpers/helpers";

type CardProps = {
  application: ApplicationType;
};

const Card: React.FC<CardProps> = ({ application }) => {
  const { email, employmentType, income, id } = application;
  const employmentTypeText = employmentTypeToText(employmentType ?? "");

  const queryClient = useQueryClient();

  const { mutate: deleteApp, isPending } = useMutation({
    mutationFn: (id: number) => deleteApplication(id),
    onSuccess: () => {
      toast.success("Application deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      console.log("Error deleting an application");
      toast.error(`Submission failed: ${error.message}`);
    },
  });

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center mt-4">
          <ClipLoader
            color={"var(--success-color)"}
            loading={isPending}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div
          style={{ boxShadow: "var(--drop-shadow)" }}
          className="flex flex-row justify-between items-center shadow-[var(--drop-shadow)] p-[16px] bg-[var(--white-color)] rounded-lg max-w-[400px] md:min-w-[350px] lg:min-w-[350px]"
          data-testid="application-card"
        >
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-base text-[var(--black-color)]">
              {email}
            </div>
            <div className="flex flex-row text-xs text-[var(--secondary-color)] font-medium gap-1">
              <div>{employmentTypeText}</div> - <div>{income} €</div>
            </div>
          </div>
          <button
            className="bg-[var(--warning-color)] h-[40px] w-[40px] rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => (id ? deleteApp(id) : "")}
            data-testid="trash-icon"
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
