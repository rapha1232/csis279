import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import DarkTheme from "../components/DarkTheme";
import { Toaster } from "../components/ui/toaster";
import routes from "../constants/nav";
import useGetUser from "../hooks/useGetUser";
const App = () => {
  const user = useGetUser();
  return (
    <DarkTheme>
      <main>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              if (route.private) {
                return (
                  <Route key={index} element={<PrivateRoute user={user} />}>
                    <Route
                      path={route.path}
                      element={route.element}
                      index={route.exact}
                    />
                  </Route>
                );
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.layout ? route.layout : route.element}
                  index={route.exact}
                />
              );
            })}
          </Routes>
        </Router>
        <Toaster />
      </main>
    </DarkTheme>
  );
};

export default App;
