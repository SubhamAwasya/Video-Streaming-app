import React from "react";
import Video from "../components/Video";
import { useEffect, useState } from "react";
import "./css/videos_page.css";

const HomePage = ({ prop }) => {
  const [videosData, setVideosData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:9999/api/videos/get-home-videos"
      );
      const data = await response.json();
      setVideosData(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="video-page-container">
      {videosData.map((video, i) => {
        return <Video key={i} props={video} />;
      })}
    </div>
  );
};

export default HomePage;
