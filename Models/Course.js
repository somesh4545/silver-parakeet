import mongoose, { Mongoose, Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
  },
  // stores all the content of the course
  content: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Content" }],
  },
  purchasedCount: {
    type: Number,
  },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
