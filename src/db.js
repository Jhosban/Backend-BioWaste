import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.nhss0fc.mongodb.net/`;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(">>> DB is connected");
  } catch (err) {
    console.log(err);
  }
};
