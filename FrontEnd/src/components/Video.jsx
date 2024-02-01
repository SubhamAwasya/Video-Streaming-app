import React from "react";

const Video = ({ prop }) => {
  const text = " Video Title that how to do css grid in this video";
  return (
    <>
      <div
        className="mb-4"
        onClick={() => {
          prop("VideoPlayer");
        }}
      >
        <img src="thumbnail.jpg" className="rounded-lg"></img>
        <div className="flex mt-2">
          <img
            src="DefaultProfile.png"
            className="w-10 h-10 m-1 rounded-full"
          ></img>
          <div className="flex-col ml-2">
            <div className="video_title">{text.substr(0, 45) + "..."}</div>
            <div className="text-sm text-neutral-400">mr beast</div>
            <div className="text-sm text-neutral-400">
              Like 25k . 1 houre ago
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
