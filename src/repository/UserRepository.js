import UserModel from "../models/User-model.js";

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

export async function findUsersByResidenceId (residenceId){
    try {
        return await UserModel.find({ residence: residenceId })
            .select("username apartment userType plan")
            .lean();
    } catch (err) {
        throw new Error("Error finding users: ", err);
    }
}

export async function deleteUserById (id){
    try {
        await UserModel.findByIdAndDelete({ _id: id })
    } catch (err) {
        throw new Error("Error deleting user: ", err);
    }
}

export async function updateUserById (id, body) {
    try {
        await UserModel.findByIdAndUpdate(id, body, {
            new: true
        })
    } catch (err) {
        throw new Error("Error updating user: ", err);
    }
}

export async function assingUserById (id, residenceId) {
    try {
        await UserModel.findByIdAndUpdate(id, {$set: { residence: residenceId }}, {
            new: true
        })
    } catch (err) {
        //throw new Error("Error assigning user: ", err);
        console.log(err)
    }
}
export default { createUser, findUserByUsername, findUsersByResidenceId, deleteUserById, updateUserById, assingUserById };
