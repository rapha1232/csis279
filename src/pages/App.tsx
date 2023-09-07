import React from "react";
import Home from "./Home";
import NavBar from "../components/NavBar";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

function App() {
  const User = useSelector((state: RootState) => state.user);
  return (
    <div className="App">
      {User.user ? (
        <>
          <NavBar />
          <Home />
        </>
      ) : (
        <Navigate to={"/sign-in"} />
      )}
    </div>
  );
}

export default App;
