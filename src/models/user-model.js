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
    },
    plan: {
      type: new mongoose.Schema({
        planType: {
          type: Number,
          default: 0
        },
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
        },
        streak: {
          type: Number,
          default: 0
        } 
      }),
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);