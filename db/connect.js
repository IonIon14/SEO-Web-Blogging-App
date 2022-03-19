import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => console.log("DB connected"));
};
export default connectDB;
