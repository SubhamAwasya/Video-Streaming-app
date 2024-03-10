import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Video = ({ props }) => {
  const [userData, setUserData] = useState({});

  async function fetchUserData() {
    try {
      //fetching user data based on video
      const userResponse = await fetch(
        `http://localhost:3001/Users/${props.user}`
      );
      setUserData(await userResponse.json());
    } catch (error) {
      console.error("Error fetching User data:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, -1);
    fetchUserData();
  }, []);

  return (
    <>
      <Link to={`/play/${props.id}`} className="mb-4">
        <div className="hover:bg-zinc-800 p-1 rounded-lg">
          {/*Thumbnail img */}
          <img
            src={`${props.thumbnail}`}
            className="rounded-lg w-full h-auto object-cover aspect-video"
          ></img>
          <div className="flex mt-2">
            {/*Profile img */}
            <img
              src={userData.profile}
              className="w-10 h-10 m-1 rounded-full"
            ></img>
            <div className="flex-col ml-2">
              <div className="video_title">
                {props.title.length < 45
                  ? props.title
                  : props.title.substr(0, 45) + "..."}
              </div>
              {/*Channel name */}
              <div className="text-sm text-neutral-400">
                {userData.userName}
              </div>
              {/*Video info - Views and upload time */}
              <div className="text-sm text-neutral-400">
                Views {props.views} . 1 houre ago
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Video;
