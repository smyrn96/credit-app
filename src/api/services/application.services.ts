import type { ApplicationType } from "../../types/Application";
import { api } from "../axios";
import endpoints from "../endpoints/endpoints";

//Get all
export const getApplications = () => api.get(endpoints.applications);

//Get single
export const getApplicationSingle = (id: number) =>
  api.get(endpoints.applications_single(id));

//Create
export const createApplication = (data: ApplicationType) => {
  return api.post("/applications", data);
};

//Update
export const updateApplication = (id: number, data: ApplicationType) =>
  api.put(endpoints.applications_single(id), data);

//Delete
export const deleteApplication = (id: number) =>
  api.delete(endpoints.applications_single(id));
