import React, { useEffect } from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user]);
  return (
    <div className="App">
      <>
        <Home />
      </>
    </div>
  );
};

export default App;
