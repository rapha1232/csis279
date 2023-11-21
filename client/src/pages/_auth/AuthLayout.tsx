import React from "react";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <section className="flex flex-1 justify-center items-center flex-col h-screen bg-[#121212]">
      <Outlet />
    </section>
  );
}
