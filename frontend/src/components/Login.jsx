import React, { useState } from "react";
import Input1 from "./repeated/Input1";
import { MdInfo } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorMess, setErrorMess] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginValidation = (fields) => {
    for (const item of fields) {
      if (item.type == "Password") {
        if (!item.value || item.value.trim().length < 8) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Invalid password",
          }));
          return false;
        }
      }
      if (item.type == "Email") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (item.value.trim().length == 0) {
          setErrorMess((prev) => ({
            ...prev,
            Email: "Enter an email",
          }));
          return false;
        }
        if (!emailRegex.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Email: "Enter Valid Email Address",
          }));
          return false;
        }
      }
    }
    return true;
  };
  const handleSubmit = () => {
    const validaton = loginValidation([
      { value: email, type: "Email" },
      { value: password, type: "Password" },
    ]);
    if (!validaton) {
      setLoadingBar(false);
      return;
    }
    const users = window.localStorage.getItem("users");
    if (!users) {
      toast.error("Failed to connect with DB");
      navigate("/register");
      return;
    }
    const parsedUsers = JSON.parse(users);
    const findEmail = parsedUsers.find((item) => item.email == email);
    if (!findEmail) {
      toast.error("You have not registered yet !");
      navigate("/register");
      return;
    }
    if (findEmail.password != password) {
      toast.error("Invalid Password !");
      return;
    }
    toast.success("Successfully Signed In");
    navigate(`/profile?email=${findEmail.email}`);
  };
  return (
    <section className="flex flex-col gap-4 w-full h-full p-4 py-2">
      <article className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 mr-16 mb-2">
          <h2 className="text-xl font-bold tracking-tight">
            Signin to your
            <br /> PopX account
          </h2>
          <small className="text-[#999b9e] font-medium">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </small>
        </div>
        <Input1
          errorMess={errorMess}
          setErrorMess={setErrorMess}
          fieldValue={email}
          setfieldValue={setEmail}
          handleNext={() => {
            if (!loginValidation([{ value: email, type: "Email" }])) {
              return;
            }
            const nextfield = document.getElementById("password");
            if (nextfield) {
              nextfield.focus();
            }
          }}
          type={"email"}
          name={"email"}
          htmlFor={"email"}
          id={"email"}
          label={"Email Address"}
          autoFocus={false}
          required={true}
          errorKey={"Email"}
        />
        <Input1
          errorMess={errorMess}
          setErrorMess={setErrorMess}
          fieldValue={password}
          setfieldValue={setPassword}
          handleNext={handleSubmit}
          type={"password"}
          name={"password"}
          htmlFor={"password"}
          id={"password"}
          label={"Password"}
          autoFocus={false}
          required={true}
          errorKey={"Password"}
        />
      </article>
      <button
        className="py-3 font-medium text-xs rounded-md bg-[#6e26ff] text-white cursor-pointer"
        onClick={handleSubmit}
      >
        Login
      </button>
      <small>
        create account?{" "}
        <span
          className="font-bold text-[#6e26ff] cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </small>
    </section>
  );
}
