import api from "./api";

export const registerUser = async (payload) => {
  console.log("Entered Register");
  
  const response = await api.post("/auth/register", payload);

  console.log(payload)

  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};