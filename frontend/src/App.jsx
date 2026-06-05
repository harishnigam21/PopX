import React from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <section className="w-screen h-screen flex items-center-safe justify-center-safe overflow-x-hidden overflow-y-auto">
      <article className="w-80 h-142 border border-[#e1e1e1] bg-[#f7f8f9] p-4">
        <Outlet />
      </article>
    </section>
  );
}
