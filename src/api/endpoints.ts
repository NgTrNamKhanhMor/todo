import { API_URL } from "~/const/system";

export const basePaths = {
  user: API_URL + "/users",
  todo: API_URL + "/todo",
};
const createEndpoint = (basePath: string) => ({
  getAll: `${basePath}`,
  create: `${basePath}`,
  getById: (id: number) => `${basePath}/${id}`,
  updateById: (id: number) => `${basePath}/${id}`,
  deleteById: (id: number) => `${basePath}/${id}`,
});

export const apiEndpoints = {
  user: {
    ...createEndpoint(basePaths.user),
    register: `${basePaths.user}`,
  },
  todo: createEndpoint(basePaths.todo),
};
