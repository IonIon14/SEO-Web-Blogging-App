import User from "../models/User.js";

const read = (req, res) => {
  req.profile.hashedPassword = undefined;
  return res.json(req.profile);
};

export { read };
