import React from "react";
import Video from "../components/Video.jsx";
import Comment from "../components/Comment.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/user-context.jsx";

const baseRout = "http://localhost:9999/api/";

const VideoPlayer = () => {
  const { user } = useContext(UserContext);
  const videoID = useParams().id;
  const [commentText, setCommentText] = useState("");
  const [videoData, setVideoData] = useState({});
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);
  const [relatedVidos, setRelatedVidos] = useState([]);

  async function fetchVideoAndUserData() {
    //fetching video data based on params
    const videoResponse = await fetch(
      `${baseRout}videos/get-video-by-id?id=${videoID}`
    );

    const tempVideoData = await videoResponse.json();
    //fetching user data based on video
    const userResponse = await fetch(
      `${baseRout}users/get-users-by-id?id=${tempVideoData.user}`
    );
    const tempUserData = await userResponse.json();
    //fetching comments data based on video
    // ---------------------------------------------------
    const commentResponse = await fetch(
      `${baseRout}comments/get-comments?comment_to=${videoID}`
    );
    const tempCommentData = await commentResponse.json();
    // ---------------------------------------------------

    //setting data of videos, users and comments
    setVideoData(tempVideoData);
    setUserData(tempUserData);
    // ---------------------------------------------------
    setComments(tempCommentData);
    // ---------------------------------------------------
  }

  //fetch related videos to suggest next videos in the right side
  async function fetchRelatedVideos() {
    const response = await fetch(
      "http://localhost:9999/api/videos/get-home-videos"
    );
    const data = await response.json();
    setRelatedVidos(data); // Update the state with the fetched data
  }

  // resizing textarea based on text present in text box
  function AutoResizingTextarea(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  // add comment to database
  async function createNewComment() {
    setCommentText(commentText.trim());

    if (commentText === "") {
      alert("Enter some text in comment box");
      return;
    }

    const comment = commentText;
    const commentBy = user._id;
    const commentTo = videoData._id;

    const query = `?comment=${comment}&commentBy=${commentBy}&commentTo=${commentTo}`;
    await fetch(`${baseRout}comments/create-new-comment${query}`, {
      method: "post",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setComments((prevComments) => [res, ...prevComments]);
      });
    // empty text area
    setCommentText("");
  }

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
    <div className="flex mx-20 w-full wf max-sm:mx-4 max-md:mx-10 my-4 ">
      <div className="w-full">
        {/*Video Tage is hear-----------------------------------------------------------------------------------------------------------------------*/}
        <video
          id="videoPlayer"
          className="-z-10 w-full aspect-video rounded-lg"
          src={videoData.video}
          autoPlay
          controls
        ></video>
        <div className="-z-10 w-full rounded-lg p-2 h-16">
          {/*title -----------------------------------------------------------------------------------------------------------------------*/}
          <div className="text-2xl mb-2">{videoData.title}</div>
          <div className="justify-between flex video_player-detail">
            <div className="flex items-center">
              {/*User profile img-----------------------------------------------------------------------------------------------------------------------*/}
              <Link to={"/profile"}>
                <img
                  src={userData.profile}
                  className="ml-2 w-16 h-16 aspect-square rounded-full"
                ></img>
              </Link>
              <div className="ml-2">
                {/*user / channer name-----------------------------------------------------------------------------------------------------------------------*/}
                <Link
                  to={`/profile`}
                  state={{ isOtherUserProfile: true, ...userData }}
                  className="video_player-channel_name font-bold"
                >
                  {userData.username}
                </Link>
                {/*user subscribers-----------------------------------------------------------------------------------------------------------------------*/}
                <div className="text-sm opacity-50">12m subscribers</div>
                <div className="text-sm opacity-50">
                  Views {videoData.views} 1h ago
                </div>
              </div>
            </div>
            <div className="flex max-sm:flex-col">
              <button
                disabled={!user}
                className=" flex items-center justify-center h-[2rem] py-1 px-2 mx-1 rounded-lg border-2 border-neutral-400 hover:border-red-500 hover:text-red-500 text-xs disabled:text-zinc-700 disabled:border-zinc-700"
              >
                <span className="material-symbols-outlined pr-1 scale-[0.8]">
                  thumb_up
                </span>
                {videoData.likes}
              </button>
              <button
                disabled={!user}
                className="flex items-center justify-center h-[2rem] py-1 px-2 ml-1 rounded-lg border-2 border-neutral-400 hover:border-red-500 hover:text-red-500 text-xs disabled:text-zinc-700 disabled:border-zinc-700"
              >
                Subscribe
              </button>
            </div>
          </div>
          <hr className="m-4"></hr>

          {/*input comments-----------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex flex-col items-end">
            <textarea
              id="autoresize commentBox"
              maxLength="200"
              placeholder={user ? "Add comment :" : "Login to add comment"}
              disabled={!user}
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              onInput={AutoResizingTextarea}
              className="w-full resize-none overflow-hidden rounded-lg p-2 text-sm outline-none"
            />
            {!user || (
              <button
                onClick={createNewComment}
                className="flex items-center justify-center h-[2rem] py-1 px-2 mt-2 rounded-lg border-2 border-neutral-400 hover:border-red-500 hover:text-red-500 text-xs disabled:text-zinc-700 disabled:border-zinc-700"
              >
                Comment
              </button>
            )}
          </div>
          {/*comments-----------------------------------------------------------------------------------------------------------------------*/}
          <div className="video_comments_container mt-2">
            <span className="text-lg font-extrabold">Comments :</span>
            {comments.map((element, i) => {
              return <Comment key={i} props={element} />;
            })}
          </div>
        </div>
      </div>
      {/*right video sudgestion-----------------------------------------------------------------------------------------------------------------------*/}
      <div className="flex-col w-full max-w-96 max-lg:hidden px-10 h-screen">
        {relatedVidos.map((video, i) => {
          return <Video key={i} props={video} />;
        })}
      </div>
    </div>
  );
};

export default VideoPlayer;
