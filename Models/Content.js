import mongoose, { Mongoose, Schema } from "mongoose";

const contentSchema = new Schema({
  contentType: {
    type: String,
    default: "Folder",
  },
  title: {
    type: String,
  },

  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: "Content",
    default: null,
  },
  children: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Content",
      },
    ],
    default: [],
  },

  videoUrl: {
    type: String,
  },
  chapters: {
    type: [
      {
        chapterName: { type: String },
        seconds: { type: Number },
      },
    ],
    default: [],
  },
  summary: {
    type: String,
  }
});

const Content =
  mongoose.models.Content || mongoose.model("Content", contentSchema);
export default Content;
