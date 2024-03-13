import asyncHandler from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";
import { json } from "express";

const getComment = asyncHandler(async (req, res) => {
  try {
    const comment_to = req.query.comment_to;
    if (!comment_to) {
      return res.status(400).send({ message: "Comment target not specified." });
    }
    let receivedComments = await Comment.find({ commentTo: comment_to });
    receivedComments.reverse();
    res.status(200).send(receivedComments);
  } catch (error) {
    console.log("Error from Comment.controller : getComment :=" + error);
    res.send(error);
  }
});

const createNewComment = asyncHandler(async (req, res) => {
  try {
    const { comment, commentBy, commentTo } = req.query;

    if (!comment || !commentBy || !commentTo) {
      return res.status(409).send({ message: "You not loged in" });
    }

    // Create a new comment object
    const newComment = new Comment({
      comment,
      commentBy,
      commentTo,
    });

    // Save the new comment to the database
    const receivedComments = await newComment.save();
    console.log(receivedComments);
    // If you want to return the newly created comment:
    res.status(200).send(receivedComments);
  } catch (error) {
    console.log("Error from Comment.controller : addCommend :=" + error);
    res.send(error);
  }
});

export { getComment, createNewComment };
