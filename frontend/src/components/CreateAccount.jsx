import React, { useState } from "react";
import Input1 from "./repeated/Input1";
import { MdInfo } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [errorMess, setErrorMess] = useState(null);
  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cname, setCname] = useState("");
  const [agencyRes, setAgencyRes] = useState("yes");
  const navigate = useNavigate();
  const registrationValidation = (fields) => {
    for (const item of fields) {
      if (item.type == "Full_Name") {
        if (item.value.trim().length <= 3) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Invalid ${item.type}`,
          }));
          return false;
        }
      }
      if (item.type == "Password") {
        if (!item.value) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password is required.",
          }));
          return false;
        }
        if (/\s/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password cannot contain spaces.",
          }));
          return false;
        }
        if (!/(?=.*[A-Z])/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password needs at least one capital letter.",
          }));
          return false;
        }
        if (!/(?=.*\d)/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password needs at least one number.",
          }));
          return false;
        }
        if (!/(?=.*[!@#$%^&*()_+])/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password needs at least one symbol.",
          }));
          return false;
        }
        if (item.value.trim().length < 8) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password must be at least 8 characters long.",
          }));
          return false;
        }
      }

      if (item.type == "Phone_Number") {
        if (!item.value) {
          setErrorMess((prev) => ({
            ...prev,
            Phone_Number: "Mobile number is required.",
          }));
          return false;
        }

        if (/\s/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Phone_Number: "Mobile number cannot contain spaces.",
          }));
          return false;
        }

        if (!/^\d+$/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Phone_Number: "Mobile number must contain only numbers.",
          }));
          return false;
        }

        if (item.value.length !== 10) {
          setErrorMess((prev) => ({
            ...prev,
            Phone_Number: "Mobile number must be exactly 10 digits long.",
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
      if (item.type == "Agency_Response") {
        if (item.value != "yes" && item.value != "no") {
          setErrorMess((prev) => ({
            ...prev,
            Agency_Response: `Select yes or no `,
          }));
          return false;
        }
      }
    }
    return true;
  };
  const handleSubmit = () => {
    const validaton = registrationValidation([
      { value: fname, type: "Full_Name" },
      { value: phone, type: "Phone_Number" },
      { value: email, type: "Email" },
      { value: password, type: "Password" },
      { value: agencyRes, type: "Agency_Response" },
    ]);
    if (!validaton) {
      setLoadingBar(false);
      return;
    }
    const users = window.localStorage.getItem("users");
    if (!users) {
      window.localStorage.setItem("users", JSON.stringify([]));
    }
    const parsedUsers = JSON.parse(users);
    const findEmail = parsedUsers.find((item) => item.email == email);
    if (findEmail) {
      toast.error("Account Already exist, please Login");
      navigate("/login");
      return;
    }
    const payload = [
      ...users,
      { fname, phone, email, password, cname, agencyRes },
    ];
    window.localStorage.setItem("users", JSON.stringify(payload));
    toast.success("Successfully Registered");
    navigate("/login");
  };
  return (
    <section className="flex flex-col gap-4 w-full h-full p-4 py-2">
      <article className="flex flex-col gap-4 grow">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          Create your
          <br /> PopX account
        </h2>
        <Input1
          errorMess={errorMess}
          setErrorMess={setErrorMess}
          fieldValue={fname}
          setfieldValue={setFname}
          handleNext={() => {
            if (
              !registrationValidation([{ value: fname, type: "Full_Name" }])
            ) {
              return;
            }
            const nextfield = document.getElementById("phone");
            if (nextfield) {
              nextfield.focus();
            }
          }}
          type={"text"}
          name={"fname"}
          htmlFor={"fname"}
          id={"fname"}
          label={"Full Name"}
          autoFocus={true}
          required={true}
          errorKey={"Full_Name"}
        />
        <Input1
          errorMess={errorMess}
          setErrorMess={setErrorMess}
          fieldValue={phone}
          setfieldValue={setPhone}
          handleNext={() => {
            if (
              !registrationValidation([
                { value: phone.toString(), type: "Phone_Number" },
              ])
            ) {
              return;
            }
            const nextfield = document.getElementById("email");
            if (nextfield) {
              nextfield.focus();
            }
          }}
          type={"number"}
          name={"phone"}
          htmlFor={"phone"}
          id={"phone"}
          label={"Phone number"}
          autoFocus={false}
          required={true}
          errorKey={"Phone_Number"}
        />
        <Input1
          errorMess={errorMess}
          setErrorMess={setErrorMess}
          fieldValue={email}
          setfieldValue={setEmail}
          handleNext={() => {
            if (!registrationValidation([{ value: email, type: "Email" }])) {
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
          handleNext={() => {
            if (
              !registrationValidation([{ value: password, type: "Password" }])
            ) {
              return;
            }
            const nextfield = document.getElementById("cname");
            if (nextfield) {
              nextfield.focus();
            }
          }}
          type={"password"}
          name={"password"}
          htmlFor={"password"}
          id={"password"}
          label={"Password"}
          autoFocus={false}
          required={true}
          errorKey={"Password"}
        />
        <Input1
          errorMess={errorMess}
          setErrorMess={setErrorMess}
          fieldValue={cname}
          setfieldValue={setCname}
          handleNext={() => {
            const nextfield = document.getElementById("agencyyes");
            if (nextfield) {
              nextfield.focus();
            }
          }}
          type={"text"}
          name={"cname"}
          htmlFor={"cname"}
          id={"cname"}
          label={"Company name"}
          autoFocus={false}
          required={false}
          errorKey={"Company Name"}
        />
        <div>
          <p className="text-xs text-[#6f7275] font-bold after:content-['*'] after:pl-1 after:text-red-500 pb-2">
            Are you an agency?
          </p>
          <div className="flex flex-nowrap gap-4 items-center text-xs">
            <div className="flex items-center gap-1 text-[#6f7275]">
              <input
                type="radio"
                id="agencyyes"
                name="agency"
                value="yes"
                checked={agencyRes === "yes"}
                onChange={(e) => {
                  if (errorMess && errorMess["Agency_Response"]) {
                    const { Agency_Response: _, ...other } = errorMess;
                    setErrorMess(other);
                  }
                  setAgencyRes(e.target.value);
                }}
              />
              <label htmlFor="agencyyes">Yes</label>
            </div>
            <div className="flex items-center gap-1 text-[#6f7275] text-xs">
              <input
                type="radio"
                id="agencyno"
                name="agency"
                value="no"
                checked={agencyRes === "no"}
                onChange={(e) => {
                  if (errorMess && errorMess["Agency_Response"]) {
                    const { Agency_Response: _, ...other } = errorMess;
                    setErrorMess(other);
                  }
                  setAgencyRes(e.target.value);
                }}
              />
              <label htmlFor="agencyno">No</label>
            </div>
          </div>
          {errorMess && errorMess["Agency_Response"] && (
            <small className="text-red-500 flex mt-1 gap-2 items-center">
              <MdInfo className="text-sm text-red-500" />
              {errorMess["Agency_Response"]}
            </small>
          )}
        </div>
      </article>
      <button
        className="py-3 font-medium text-xs rounded-md bg-[#6e26ff] text-white cursor-pointer"
        onClick={handleSubmit}
      >
        Create Account
      </button>
      <small>
        Already have account?{" "}
        <span
          className="font-bold text-[#6e26ff] cursor-pointer"
          onClick={() => navigate("/login")}
        >
          SignIn
        </span>
      </small>
    </section>
  );
}
