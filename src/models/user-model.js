import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    confirmPassword:{
      type: String,
      required: true,
    },
    phoneNumber: {
        type: String
    },
    apartment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);