import { createContext, useContext } from "react";
import type { ApplicationType } from "../types/Application";

export const StateContext = createContext<{
  data: ApplicationType;
  setData: React.Dispatch<React.SetStateAction<ApplicationType>>;
} | null>(null);

export const useContextProvider = () => {
  const context = useContext(StateContext);
  if (!context)
    throw new Error("useWizard must be used within ContextProvider");
  return context;
};
