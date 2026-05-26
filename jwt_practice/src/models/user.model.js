import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: String,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: String,
      trim: true,
      min: 6,
      max: 12,
    },
  },
  { timestamp: true },
);


export const User  = mongoose.model("User", userSchema);