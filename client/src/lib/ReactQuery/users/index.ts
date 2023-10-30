import axios from "axios";
import { NewUser } from "../../../types";

const authApi = axios.create({
  baseURL: "http://localhost:3001/",
});

export const createUserAccount = (user: NewUser) => {
  return authApi.post("sign-up", user);
};

export const signInAccount = async (user: {
  Email: string;
  Password: string;
}) => {
  try {
    const data = await authApi.post("sign-in", {
      Email: user.Email,
      Password: user.Password,
    });

    return data.data.user;
  } catch (error) {
    console.log(error);
  }
};

export const signOutAccount = () => {
  return authApi.post("sign-out");
};
