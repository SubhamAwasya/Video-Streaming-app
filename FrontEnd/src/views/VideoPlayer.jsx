import React from "react";
import Video from "../components/Video.jsx";
import Comment from "../components/Comment.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const videoID = useParams().id;
  const [text, setText] = useState("");
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

  // resizing textarea based on text present in text box
  const AutoResizingTextarea = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    window.scrollTo(0, -1);
    //calling function to fetch data
    fetchVideoAndUserData();
    fetchRelatedVideos();
    // video play from start
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
              <div className="ml-2">
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
              <button className="flex items-center justify-center h-[2rem] py-1 px-2 mx-1 rounded-lg border-2 border-neutral-400 hover:border-neutral-600 hover:text-neutral-600 text-xs ">
                <span className="material-symbols-outlined pr-1 scale-[0.8]">
                  thumb_up
                </span>
                {videoData.likes}
              </button>
              <button className="flex items-center justify-center h-[2rem] py-1 px-2 ml-1 rounded-lg border-2 border-neutral-400 hover:border-neutral-600 hover:text-neutral-600 text-xs ">
                Subscribe
              </button>
            </div>
          </div>
          <hr className="m-4"></hr>

          {/*input comments*/}
          <div className="flex flex-col items-end">
            <textarea
              id="autoresize"
              maxLength="200"
              placeholder="Add comment :"
              onChange={(e) => setText(e.target.value)}
              onInput={AutoResizingTextarea}
              className="w-full resize-none overflow-hidden rounded-lg p-2 text-sm outline-none"
            />
            <button className="flex items-center justify-center h-[2rem] py-1 px-2 mt-2 rounded-lg border-2 border-neutral-400 hover:border-neutral-600 hover:text-neutral-600 text-xs ">
              Comment
            </button>
          </div>
          {/*comments*/}
          <div className="video_comments_container">
            <span className="text-lg font-extrabold">Comments :</span>
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
