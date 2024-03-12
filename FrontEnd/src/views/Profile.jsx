import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      // navigate("/login");
    }
  }, []);

  return (
    <div className=" min-h-screen w-full flex flex-col">
      <div className=" p-6 w-96 rounded-lg flex flex-col justify-center items-center">
        <img
          className="h-24 w-24 rounded-full mx-auto"
          src={user ? user.profile : "DefaultProfile.png"}
          alt="User profile"
        />
        <input
          type="text"
          name="username"
          value={user ? user.username : "UserName"}
          onChange={"handleChange"}
          className="text-white w-full text-center p-2 m-1 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={user ? user.email : "Email"}
          onChange={"handleChange"}
          className="text-white w-full text-center p-2 m-1 rounded-md"
        />
        <button
          onClick={() => {}}
          className="bg-transparent hover:bg-neutral-700 border-2 border-neutral-500 hover:border-neutral-300 p-2 w-40 m-4 rounded-md"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
