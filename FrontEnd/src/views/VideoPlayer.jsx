import React from "react";
import Video from "../components/Video.jsx";
import Comment from "../components/Comment.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const videoID = useParams().id;
  const [videoData, setVideoData] = useState({});
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);
  const [relatedVidos, setRelatedVidos] = useState([]);

  async function fetchVideoAndUserData() {
    //fetching video data based on params
    const videoResponse = await fetch(
      `http://localhost:3001/Videos/${videoID}`
    );

    const tempVideoData = await videoResponse.json();
    //fetching user data based on video
    const userResponse = await fetch(
      `http://localhost:3001/Users/${tempVideoData.user}`
    );
    const tempUserData = await userResponse.json();
    //fetching comments data based on video
    const commentResponse = await fetch(
      `http://localhost:3001/Comments?commentTo=${videoID}`
    );
    const tempCommentData = await commentResponse.json();
    //setting data of videos, users and comments
    setVideoData(tempVideoData);
    setUserData(tempUserData);
    setComments(tempCommentData);
  }

  //fetch related videos to suggest next videos in the right side
  async function fetchRelatedVideos() {
    const response = await fetch("http://localhost:3001/Videos");
    const data = await response.json();
    setRelatedVidos(data); // Update the state with the fetched data
  }

  useEffect(() => {
    window.scrollTo(0, -1);
    fetchVideoAndUserData();
    fetchRelatedVideos();
    const VP = document.getElementById("videoPlayer");
    addEventListener("DOMContentLoaded", () => {
      VP.currentTime = 0;
      VP.play();
    });
  }, [useParams(), videoData.id, userData.user]);

  return (
    <div className="flex m-8 items-start">
      <div className="">
        {/*Video Tage is hear*/}
        <video
          id="videoPlayer"
          className="-z-10 w-full max-w-6xl rounded-lg"
          src={videoData.video}
          autoPlay
          controls
        ></video>
        <div className="-z-10 w-full max-w-6xl rounded-lg p-2 h-16">
          {/*title */}
          <div className="text-2xl mb-2">{videoData.title}</div>
          <div className="justify-between flex video_player-detail">
            <div className="flex items-center">
              {/*User profile img*/}
              <img
                src={userData.profile}
                className="ml-2 w-16 h-16 aspect-square rounded-full"
              ></img>
              <div style={{ margin: "5px" }}>
                {/*user / channer name*/}
                <div className="video_player-channel_name font-bold">
                  {userData.userName}
                </div>
                {/*user subscribers*/}
                <div className="text-sm opacity-50">12m subscribers</div>
                <div className="text-sm opacity-50">
                  Views {videoData.views} 1h ago
                </div>
              </div>
            </div>
            <div className="flex max-sm:flex-col">
              <button className="flex items-center justify-center h-fit p-1 m-1 rounded-lg border-2 border-neutral-400 hover:border-neutral-600 text-xs ">
                <span className="material-symbols-outlined pr-2">thumb_up</span>
                {videoData.likes}
              </button>
              <button className="flex items-center justify-center h-fit p-1 m-1 rounded-lg border-2 border-neutral-400 hover:border-neutral-600 text-xs ">
                <span className="material-symbols-outlined pr-2">
                  thumb_down
                </span>
                Dislike
              </button>
              <button className="flex items-center justify-center h-fit p-1 m-1 rounded-lg border-2 border-neutral-400 hover:border-neutral-600 text-xs ">
                <span className="material-symbols-outlined pr-2">share</span>
                Subscribe
              </button>
            </div>
          </div>
          <hr className="m-4"></hr>
          {/*Comments*/}
          <div className="video_comments_container">
            <span className="text-lg font-extrabold">Comments :</span>
            {comments.map((element, i) => {
              return <Comment key={i} props={element} />;
            })}
          </div>
        </div>
      </div>
      {/*right video sudgestion*/}
      <div className="flex-col ml-8 w-full max-w-64 max-lg:hidden h-screen">
        {relatedVidos.map((video, i) => {
          return <Video key={i} props={video} />;
        })}
      </div>
    </div>
  );
};

export default VideoPlayer;
