import AdminModel from "../models/Admin-model.js";

export async function createAdmin(newAdmin) {
  try {
    return await newAdmin.save();
  } catch (err) {
    throw new Error("Error creating administrator");
  }
}

export async function findAdminByUsername(username) {
  try {
    return await AdminModel.findOne({ username: username });
  } catch (err) {
    throw new Error("Error finding administrator");
  }
}

export async function findAdminById(id) {
  try {
    return await AdminModel.findOne({ _id: id });
  } catch (err) {
    throw new Error("Error finding administrator");
  }
}

export async function updateAdminById(id, body) {
  try {
    return await AdminModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  } catch (err) {
    throw new Error("Error updating Administrator");
  }
}

export default {
  createAdmin,
  findAdminByUsername,
  findAdminById,
  updateAdminById,
};
