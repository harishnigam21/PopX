import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-4 w-full h-full justify-end-safe p-4">
      <div className="flex flex-col gap-1 mr-16">
        <h2 className="text-xl font-bold tracking-tight">Welcome to PopX</h2>
        <small className="text-[#999b9e] font-medium">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </small>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="py-3 font-medium text-xs rounded-md bg-[#6e26ff] text-white cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Create Account
        </button>
        <button className="py-3 font-medium text-xs rounded-md bg-[#cebafb] text-black cursor-pointer">
          Already Registered? Login
        </button>
      </div>
    </section>
  );
}
