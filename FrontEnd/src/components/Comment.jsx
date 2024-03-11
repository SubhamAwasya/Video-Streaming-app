import React, { useEffect, useState } from "react";

const Comment = ({ props }) => {
  const [commentBy, setcommentBy] = useState({});
  async function fetchCommentBy() {
    //fetching that who comment in this video
    const commentByResponse = await fetch(
      `http://localhost:3001/Users/${props.commentBy}`
    );
    const tempCommentByData = await commentByResponse.json();
    setcommentBy(tempCommentByData);
  }
  useEffect(() => {
    fetchCommentBy();
  }, [commentBy]);
  return (
    <div className="my-2 p-2 bg-neutral-950 rounded-lg">
      <div className="flex items-center">
        {/* user profile who comment in this video */}
        <img src={commentBy.profile} className="w-10 h-10 rounded-full"></img>
        <div className="m-2">
          <div className="">{commentBy.userName}</div>
        </div>
      </div>
      {/* actual comment */}
      <div className="text-base">{props.comment}</div>
    </div>
  );
};

export default Comment;
