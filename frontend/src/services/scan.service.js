import api from "./api";

export const getScans = async () => {
  const response = await api.get("/scans");

  return response.data;
};

export const getScanBySlug = async (slug) => {
  const response = await api.get(`/scans/${slug}`);

  return response.data;
};