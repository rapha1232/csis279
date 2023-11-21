import { User } from "../types/index";

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

const getToken = () => {
  const parsedUser = JSON.parse(localStorage.getItem("user") || "null");
  return parsedUser.token;
};
export {
  getLocalStorageUser,
  getToken,
  removeLocalStorageUser,
  setLocalStorageUser,
};
