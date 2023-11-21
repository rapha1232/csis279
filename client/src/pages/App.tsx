import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import { useAppSelector } from "../app/hooks";
import { RootState, setUser } from "../app/store";
import DarkTheme from "../components/DarkTheme";
import { Toaster } from "../components/ui/toaster";
import routes from "../constants/nav";
import { getLocalStorageUser } from "../utils/localStorageUtils";
const App = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      const savedUser = getLocalStorageUser();
      if (savedUser !== null) {
        // Check if savedUser is not null and not the string "null"
        setIsLoading(false);
        dispatch(setUser(savedUser));
      }
    }
  }, [user]);
  return (
    <DarkTheme>
      <main>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              if (route.private) {
                return (
                  <Route key={index} element={<PrivateRoute user={user!} />}>
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
