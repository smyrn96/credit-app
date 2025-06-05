import { useState, type ReactNode } from "react";
import type { ApplicationType } from "../types/Application";
import { StateContext } from "./constants";

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ApplicationType>({
    fullName: "",
    email: "",
    date: "",
    employmentType: null,
    income: null,
  });

  return (
    <StateContext.Provider value={{ data, setData }}>
      {children}
    </StateContext.Provider>
  );
};
