import { User } from "../types/index";

// Local storage utils
const getLocalStorageUser = (): User => {
  const temp = localStorage.getItem("user") ?? null;
  const parseUser = JSON.parse(temp || "null");
  delete parseUser?.token;
  return parseUser;
};
const removeLocalStorageUser = () => localStorage.removeItem("user");

const setLocalStorageUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const setLocalStorageToken = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const getLocalStorageToken = () => {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  return token;
};
export {
  getLocalStorageToken,
  getLocalStorageUser,
  removeLocalStorageUser,
  setLocalStorageToken,
  setLocalStorageUser,
};
