import asyncHandler from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getVideos = asyncHandler(async (req, res) => {
  try {
    const recivedVideos = await Video.find({});
    res.send(recivedVideos);
  } catch (error) {
    console.log("Error from Video.controller : geVideos :=" + error);
    res.send(error);
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  try {
    const video_id = req.query.id;
    const recivedVideo = await Video.findById(video_id);
    res.send(recivedVideo);
  } catch (error) {
    console.log("Error from Video.controller : getVideoById :=" + error);
    res.send(error);
  }
});

export { getVideos, getVideoById };
