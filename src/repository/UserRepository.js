import UserModel from "../models/User-model.js";

export async function createUser(newUser) {
  try {
    return await newUser.save();
  } catch (err) {
    throw new Error("Error creating user");
  }
}

export async function findUserById(id) {
  try {
    return await UserModel.findOne({ _id: id });
  } catch (err) {
    throw new Error("Error finding user");
  }
}

export async function findUserByUsername(username) {
  try {
    return await UserModel.findOne({ username: username });
  } catch (err) {
    throw new Error("Error finding user");
  }
}

export async function findUsersByResidenceId(residenceId) {
  try {
    return await UserModel.find({ residence: residenceId })
      .select("username apartment userType plan")
      .lean();
  } catch (err) {
    // throw new Error("Error finding users");
    console.log(err);
  }
}

export async function deleteUserById(id) {
  try {
    const user = await UserModel.findByIdAndUpdate(id, {
      residence: null,
    });
  } catch (err) {
    throw new Error("Error deleting user");
  }
}

export async function updateUserById(id, body) {
  try {
    return await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  } catch (err) {
    throw new Error("Error updating user");
  }
}

export async function assingUserById(id, residenceId) {
  try {
    return await UserModel.findByIdAndUpdate(
      id,
      { $set: { residence: residenceId } },
      {
        new: true,
      }
    );
  } catch (err) {
    throw new Error("Error assigning user");
  }
}

export default {
  createUser,
  findUserByUsername,
  findUsersByResidenceId,
  deleteUserById,
  updateUserById,
  assingUserById,
  findUserById,
};
