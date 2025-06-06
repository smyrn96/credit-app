import type { ApplicationType } from "../../types/Application";
import TrashIcon from "../../assets/icons/trash.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../api/services/application.services";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

type CardProps = {
  application: ApplicationType;
};

const Card: React.FC<CardProps> = ({ application }) => {
  const { email, employmentType, income, id } = application;

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
          className="flex flex-row justify-between items-center shadow-[var(--drop-shadow)] p-[16px] bg-[var(--white-color)] rounded-lg mb-4"
        >
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-base text-[var(--black-color)]">
              {email}
            </div>
            <div className="flex flex-row text-xs text-[var(--secondary-color)] font-medium gap-1">
              <div>{employmentType}</div> - <div>{income} €</div>
            </div>
          </div>
          <div
            className="bg-[var(--warning-color)] h-[40px] w-[40px] rounded-full flex justify-center items-center"
            onClick={() => (id ? deleteApp(id) : "")}
          >
            <TrashIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
