import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("Marry Doe");
  const [email, setEmail] = useState("Marry@gail.com");
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    if (!emailParam) {
      navigate("/login");
      return;
    }
    const users = window.localStorage.getItem("users");
    if (!users) {
      navigate("register");
      return;
    }
    const parsedUsers = JSON.parse(users);
    const findEmail = parsedUsers.find((item) => item.email == emailParam);
    if (!findEmail) {
      toast.error("You have not registered yet !");
      navigate("/register");
      return;
    }
    setEmail(findEmail.email);
    setName(findEmail.fname);
  }, []);
  return (
    <section className="w-full h-full overflow-hidden flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center px-3 py-4 font-medium bg-white shadow-[0_4px_10px_-10px_rgba(0,0,0,0.1)] shadow-black">
          Account Settings
        </div>
        <div className="flex flex-col p-4">
          <div className="flex flex-nowrap gap-4 my-4">
            <div className="relative">
              <img
                src="/profile.jpg"
                alt="Profile Image"
                className="w-15 h-15 aspect-square rounded-full border border-[#e1e1e1]"
              />
              <div className="w-4 h-4 p-1 bg-[#6e26ff] rounded-full flex items-center absolute bottom-2 -right-1">
                <FaCamera className="text-white w-full" />
              </div>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm">{name}</strong>
              <small>{email}</small>
            </div>
          </div>
          <small className="line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quia
            quidem pariatur aut non quam ipsam voluptate repudiandae magnam
            earum. Distinctio adipisci quisquam suscipit, ex commodi magni
            repellat numquam quae?
          </small>
        </div>
        <hr className="border border-dashed border-[#e1e1e1]" />
      </div>
      <div className="h-6 border-t border-[#e1e1e1] border-dashed"></div>
    </section>
  );
}
