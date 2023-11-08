import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getLocalStorageUser } from "../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import { useEffect } from "react";

const useGetUser = (): User => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user); // replace with your actual user selector
  const storedUser = user || getLocalStorageUser();

  useEffect(() => {
    if (!storedUser) {
      navigate("/sign-in");
    }
  }, [storedUser, navigate]);

  return storedUser;
};

export default useGetUser;
