import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ReactNode } from "react";
import React from "react";

const SignedOut = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default SignedOut;
