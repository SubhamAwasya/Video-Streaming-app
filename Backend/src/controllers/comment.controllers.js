import asyncHandler from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";

const getComment = asyncHandler(async (req, res) => {
  try {
    const comment_to = req.query.comment_to;
    const recivedComments = await Comment.find({ commentTo: comment_to });
    res.send(recivedComments);
  } catch (error) {
    console.log("Error from Video.controller : geVideos :=" + error);
    res.send(error);
  }
});

export { getComment };
