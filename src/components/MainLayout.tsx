import type { ReactNode } from "react";

type MainLayoutProps = {
  headerText: string;
  buttonText: ReactNode;
  buttonAction: () => void;
  Icon?: string;
  isDisabledButton: boolean;
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  headerText,
  buttonText,
  isDisabledButton,
  buttonAction,
  Icon,
  children,
}) => {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-between p-6">
      <div className="">
        {Boolean(buttonText) && (
          <div className="flex flex-row items-center gap-2">
            {Icon && (
              <button
                className=" cursor-pointer"
                onClick={() => console.log("back")}
              >
                <Icon />
              </button>
            )}
            <h2 className="text-[var(--black-color)] font-bold text-[32px]">
              {headerText}
            </h2>
          </div>
        )}
        {children}
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={buttonAction}
          disabled={isDisabledButton}
          className="w-full text-xl bg-[var(--orange-color)] px-[32px] py-[16px] rounded-full text-[var(--white-color)] font-semibold cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default MainLayout;
