import React, { ReactNode } from "react";
import useGetUser from "../../hooks/useGetUser";

const SignedIn = ({ children }: { children: ReactNode }) => {
  const user = useGetUser();
  if (user) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default SignedIn;
