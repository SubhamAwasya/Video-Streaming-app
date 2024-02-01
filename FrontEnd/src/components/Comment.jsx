import React from "react";

const Comment = ({ channelName, comment }) => {
  return (
    <div className="my-2 p-2 bg-neutral-950 rounded-lg">
      <div className="flex items-center">
        <img src="DefaultProfile.png" className="w-10 h-10 rounded-full"></img>
        <div className="m-2">
          <div className="">{channelName}</div>
        </div>
      </div>
      <div className="text-base">{comment}</div>
    </div>
  );
};

export default Comment;
