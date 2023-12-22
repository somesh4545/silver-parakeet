import mongoose, { Mongoose, Schema } from "mongoose";

const courseContentSchema = new Schema({
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  },
  content: {
    type: mongoose.Schema.ObjectId,
    ref: "Content",
  },
});

const CourseContent =
  mongoose.models.CourseContent ||
  mongoose.model("CourseContent", courseContentSchema);

export default CourseContent;
