import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/user-context";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [localUser, setLocalUser] = useState({
    fname: "",
    lname: "",
    profile: "",
    username: "",
    email: "",
  });

  const location = useLocation();

  useEffect(() => {
    setLocalUser({});
    const data = location.state;
    console.log(location);
    if (data?.isOtherUserProfile) {
      setLocalUser(data);
    } else {
      setLocalUser(user);
    }
  }, [localUser]);

  return (
    <div className=" min-h-screen w-full flex flex-col items-center">
      <div className=" p-6 w-96 rounded-lg flex flex-col justify-center items-center">
        <img
          className="h-24 w-24 rounded-full mx-auto"
          src={localUser.profile}
          alt="User profile"
        />
        <input
          type="text"
          name="username"
          value={localUser.fname}
          onChange={() => {}}
          className="text-white w-full text-center p-2 m-1 rounded-md"
        />
        <input
          type="text"
          name="username"
          value={localUser.lname}
          onChange={() => {}}
          className="text-white w-full text-center p-2 m-1 rounded-md"
        />
        <input
          type="text"
          name="username"
          value={localUser.username}
          onChange={() => {}}
          className="text-white w-full text-center p-2 m-1 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={localUser.email}
          onChange={() => {}}
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
