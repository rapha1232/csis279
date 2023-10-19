import { User } from '../types/index';

const getLocalStorageUser = () => {
  const parseUser = JSON.parse(localStorage.getItem('user') || 'null');
  return parseUser;
};
const removeLocalStorageUser = () => localStorage.removeItem('user');

const setLocalStorageUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getToken = () => {
  const parsedUser = JSON.parse(localStorage.getItem('user') || 'null');
  return parsedUser.token;
};

export {
  getLocalStorageUser,
  setLocalStorageUser,
  getToken,
  removeLocalStorageUser,
};
