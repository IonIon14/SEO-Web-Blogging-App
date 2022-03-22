import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import blogRoute from "./routes/blogRoute.js";
import authRoute from "./routes/authRoute.js";
import notFoundMiddleware from "./middlewares/NotFound.js";
import errorHandlerMiddleware from "./middlewares/ErrorHandler.js";
import authenticateUser from "./middlewares/auth.js";

dotenv.config();

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware
app.use("/api/blog", authenticateUser, blogRoute);
app.use("/api/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
//routes
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL_CLOUD);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
