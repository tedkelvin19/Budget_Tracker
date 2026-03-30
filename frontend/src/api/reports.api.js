import { api } from "./client";

export const reportsApi = {
  summary: (params) => api.get("/reports/summary", { params }),
  exportCsv: (params) => api.get("/reports/export", { params, responseType: "blob" }),
};