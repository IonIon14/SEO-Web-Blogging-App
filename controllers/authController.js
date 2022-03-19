import BadRequestError from "../errors/BadRequest.js";
import User from "../models/User.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });

  //const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name,
      email,
      password,
    },
  });
};

const signIn = (req, res) => {
  const { email, password } = req.body;
  res.json({ msg: "Sign in route" });
};

export { signUp, signIn };
