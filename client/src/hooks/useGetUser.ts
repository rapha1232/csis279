import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { User } from "../types";
import { getLocalStorageUser } from "../utils/localStorageUtils";

const useGetUser = (): User => {
  const user = useSelector((state: RootState) => state.user.user); // replace with your actual user selector
  const storedUser = user || getLocalStorageUser();
  return storedUser;
};

export default useGetUser;
