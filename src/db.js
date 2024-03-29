import mongoose from "mongoose";

export const connectDB = async() => {
    try {
    await mongoose.connect('mongodb+srv://jhosban:bkE5-rCtxpZyVJ.@db-biowaste.nhss0fc.mongodb.net/')
    console.log('>>> DB is conected');
} catch (err) {
    console.log(err);
}
}
