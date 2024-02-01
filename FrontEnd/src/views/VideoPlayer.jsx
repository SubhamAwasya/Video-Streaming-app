import React from "react";
import Video from "../components/Video.jsx";
import Comment from "../components/Comment.jsx";
import VideosPage from "./VideosPage.jsx";
import { useEffect } from "react";

const VideoPlayer = () => {
  useEffect(() => {
    window.scrollTo(0, -1);
  }, []);

  const text =
    "Video Title that how to do css grid in this video  how to do css grid in this Title that how to do css grid in this video  how to do css grid in this";
  return (
    <div className="flex m-8 items-start">
      <div className="">
        {/*Video Tage is hear*/}
        <video
          className="-z-10 w-full max-w-6xl rounded-lg"
          src="onepice.mkv"
          autoPlay
          controls
        ></video>
        <div className="-z-10 w-full max-w-6xl rounded-lg p-2 h-16">
          <div className="text-2xl mb-2">{text}</div>
          <div className="justify-between flex video_player-detail">
            <div className="flex items-center">
              <img
                src="DefaultProfile.png"
                className="ml-2 w-10 h-10 rounded-full"
              ></img>
              <div style={{ margin: "5px" }}>
                <div className="video_player-channel_name">mr beast</div>
                <div className="text-sm">Like 25k . 1 houre ago</div>
              </div>
            </div>
            <div className="flex max-sm:flex-col">
              <button className="flex items-center justify-center h-fit p-1 m-1 rounded-lg border-2 border-neutral-400 hover:border-neutral-600 text-xs ">
                <span className="material-symbols-outlined pr-2">thumb_up</span>
                Like
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
            <Comment
              channelName={"mr Best"}
              comment={"best vide i ever seen"}
            />
          </div>
        </div>
      </div>
      {/*right video sudgestion*/}
      <div className="flex-col ml-8 w-full max-w-60 max-lg:hidden">
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  );
};

export default VideoPlayer;
