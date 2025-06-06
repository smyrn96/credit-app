type MainButtonProps = {
  buttonType: "button" | "submit" | "reset" | undefined;
  buttonText: string;
  isDisabledButton: boolean;
  buttonAction?: () => void;
};

const MainButton: React.FC<MainButtonProps> = ({
  buttonType = "button",
  buttonText,
  isDisabledButton,
  buttonAction,
}) => {
  return (
    <button
      type={buttonType}
      onClick={buttonAction}
      disabled={isDisabledButton}
      style={{ opacity: isDisabledButton ? 0.5 : 1 }}
      className="w-full text-xl bg-[var(--success-color)] px-[32px] py-[16px] rounded-full text-[var(--white-color)] font-semibold cursor-pointer"
    >
      {buttonText}
    </button>
  );
};

export default MainButton;
