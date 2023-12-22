import mongoose from "mongoose";

const connectMongodb = async () => {
  try {
    // for time being directly using the mongo uri
    await mongoose.connect(
      "mongodb+srv://somesh:somesh@cluster0.mpdotw5.mongodb.net/cohort?retryWrites=true&w=majority"
    );
    console.log("connection established");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongodb;
