import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    slug: {
      type: String,
      trim: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tag", TagSchema);
