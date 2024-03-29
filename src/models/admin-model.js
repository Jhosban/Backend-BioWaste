import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
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
      unique: true,
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
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state:{
      type: String,
      required: true,
    },
    postalCode: {
        type: String,
        required: true,
    } 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);