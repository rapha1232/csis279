import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { User } from "../types";
import { getLocalStorageUser } from "../utils/localStorageUtils";

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
