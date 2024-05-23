import AdminModel from "../models/Admin-model.js";

export async function createAdmin (newAdmin) {
    try {
        return await newAdmin.save();
    } catch (err) {
        throw new Error("Error creating administrator: " + err);
    }
}

export async function findAdminByUsername (username) {
    try {
        return await AdminModel.findOne({ username: username })
    } catch (err) {
        throw new Error("Error finding administrator: " + err);
    }
}

export default { createAdmin, findAdminByUsername };