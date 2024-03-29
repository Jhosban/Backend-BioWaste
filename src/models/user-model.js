import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword:{
      type: String,
      required: true,
    },
    phoneNumber: {
        type: String,
    } 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);