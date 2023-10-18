import React, { useEffect } from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageUser } from "../utils/localStorageUtils";
import { RootState, setUser } from "../app/store";

const App = () => {
  const navigate = useNavigate();
  const user = getLocalStorageUser();
  const dispatch = useDispatch();
  const savedUser = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (user && !savedUser) dispatch(setUser(user));
    if (!user) navigate("/sign-in");
  }, [user, savedUser]);
  return (
    <div className="App">
      <>
        <Home />
      </>
    </div>
  );
};

export default App;
