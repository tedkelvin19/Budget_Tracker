import { api } from "./client";

export const loansApi = {
  list: () => api.get("/loans"),
  create: (payload) => api.post("/loans", payload),
  update: (id, payload) => api.put(`/loans/${id}`, payload),
  remove: (id) => api.delete(`/loans/${id}`),
};