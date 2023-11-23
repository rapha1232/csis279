import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import DarkTheme from "../components/DarkTheme";
import { Toaster } from "../components/ui/toaster";
import routes from "../constants/nav";
import useGetUser from "../hooks/useGetUser";
import AuthLayout from "./_auth/AuthLayout";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";
const App = () => {
  const user = useGetUser();
  return (
    <DarkTheme>
      <main>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={`/${user ? "home" : "sign-in"}`} />}
            />
            <Route element={<AuthLayout />}>
              <Route element={<SignIn />} path="/sign-in" />
              <Route element={<SignUp />} path="/sign-up" />
            </Route>
            <Route element={<PrivateRoute user={user} />}>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </main>
    </DarkTheme>
  );
};

export default App;
