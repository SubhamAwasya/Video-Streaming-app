import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  commentBy: {
    type: String,
    required: true,
  },
  commentTo: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
