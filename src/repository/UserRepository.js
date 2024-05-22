import UserModel from "../models/user-model.js";
export async function createUser (newUser) {
    try {
        return await newUser.save();
    } catch (err) {
        throw new Error("Error creating user: " + err);
    }
}

export async function findUserByUsername (username) {
    try {
        return await UserModel.findOne({ username: username })
    } catch (err) {
        throw new Error("Error finding user: " + err);
    }
}
export default { createUser, findUserByUsername };
