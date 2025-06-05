import type { AxiosResponse } from "axios";
import type {
  ApplicationResponseType,
  ApplicationType,
  SingleApplicationResponseType,
} from "../../types/Application";
import { api } from "../axios";
import endpoints from "../endpoints/endpoints";

//Get all
export const getApplications = (): ApplicationResponseType => {
  return api.get("/applications");
};

//Get single
export const getApplicationSingle = (
  id: number
): SingleApplicationResponseType => api.get(endpoints.applications_single(id));

//Create
export const createApplication = (
  data: ApplicationType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<AxiosResponse<any, any>> => {
  return api.post("/applications", data);
};

//Update
export const updateApplication = (
  id: number,
  data: ApplicationType
): SingleApplicationResponseType =>
  api.put(endpoints.applications_single(id), data);

//Delete
export const deleteApplication = (
  id: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<AxiosResponse<any, any>> =>
  api.delete(endpoints.applications_single(id));
