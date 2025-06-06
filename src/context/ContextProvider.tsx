import { useState, type ReactNode } from "react";
import type { ApplicationType } from "../types/Application";
import { StateContext } from "./constants";
import { initialState } from "../constants/constants";

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ApplicationType>(initialState);

  return (
    <StateContext.Provider value={{ data, setData }}>
      {children}
    </StateContext.Provider>
  );
};
