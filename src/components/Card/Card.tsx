import type { ApplicationType } from "../../types/Application";
import TrashIcon from "../../assets/icons/trash.svg";

type CardProps = {
  application: ApplicationType;
};

const Card: React.FC<CardProps> = ({ application }) => {
  const { email, employmentType, income } = application;

  return (
    <div
      style={{ boxShadow: "var(--drop-shadow)" }}
      className="flex flex-row justify-between items-center shadow-[var(--drop-shadow)] p-[16px] bg-[var(--white-color)] rounded-lg mb-4"
    >
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-base text-[var(--black-color)]">
          {email}
        </div>
        <div className="flex flex-row text-xs text-[var(--secondary-color)] font-medium gap-2">
          <div>{employmentType}</div> - <div>{income} €</div>
        </div>
      </div>
      <div className="bg-[var(--red-color)] h-[40px] w-[40px] rounded-full flex justify-center items-center">
        <TrashIcon />
      </div>
    </div>
  );
};

export default Card;
