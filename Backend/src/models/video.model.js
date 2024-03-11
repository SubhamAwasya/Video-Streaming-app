import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

export const Video = mongoose.model("Video", videoSchema);
