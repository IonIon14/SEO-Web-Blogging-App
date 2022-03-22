import BadRequestError from "../errors/BadRequest.js";
import User from "../models/User.js";
import shortid from "shortid";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

const signUp = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email is taken",
      });
    }
  });
  let username = shortid.generate();
  let profile = `${process.env.CLIENT_URL}/profile/${username}`;

  let newUser = new User({ name, email, password, profile, username });

  newUser.save((err, success) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: err,
      });
    }
    // res.status(StatusCodes.CREATED).json({
    //   user: success,
    // });

    res.status(StatusCodes.CREATED).json({
      message: "Sign Up Success! Please Sign In",
    });
  });

  //const token = user.createJWT();
};

const signIn = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup.",
      });
    }
    if (!user.authenticate(password)) {
      res.status(400).json({
        error: "Email and password do not match!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    res.status(StatusCodes.OK).json({
      token,
      user: {
        _id,
        username,
        name,
        email,
        role,
      },
    });
  });
};

const signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

export { signUp, signIn, signOut, requireSignin };
