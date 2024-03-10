import React from "react";
import Video from "../components/Video";
import { useParams } from "react-router-dom";
import "./css/videos_page.css";
import { useEffect } from "react";

const HomePage = ({ prop }) => {
  console.log(useParams());

  return (
    <div className="video-page-container">
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
    </div>
  );
};

export default HomePage;
