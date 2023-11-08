import { ReactNode } from "react";
import React from "react";
import useGetUser from "../../hooks/useGetUser";

const SignedOut = ({ children }: { children: ReactNode }) => {
  const user = useGetUser();
  if (!user) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default SignedOut;
