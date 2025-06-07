import type { ReactNode } from "react";
import MainButton from "../Buttons/MainButton";

type MainLayoutProps = {
  headerText: string;
  buttonText: string;
  buttonAction?: () => void;
  Icon?: string;
  iconAction?: () => void;
  isDisabledButton: boolean;
  isInForm?: boolean;
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  headerText,
  buttonText,
  isDisabledButton,
  isInForm = false,
  Icon,
  buttonAction,
  iconAction,
  children,
}) => {
  const hasHeader = Boolean(headerText);
  const hasButton = Boolean(buttonAction);
  const hasHeaderStyle = !hasHeader
    ? {
        display: "flex",
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center" as const,
      }
    : {};

  return (
    <div
      className="min-h-screen h-auto w-full flex flex-col justify-between p-6"
      style={{ height: isInForm ? "100vh" : "auto" }}
    >
      <div className="h-full" style={hasHeaderStyle}>
        {hasHeader && (
          <div className="flex flex-row items-center gap-2">
            {Icon && (
              <button
                className=" cursor-pointer"
                onClick={iconAction}
                data-testid="icon-button"
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
      {hasButton && (
        <div className="w-full flex justify-center mt-6">
          <MainButton
            buttonType="button"
            buttonText={buttonText}
            buttonAction={buttonAction}
            isDisabledButton={isDisabledButton}
          />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
