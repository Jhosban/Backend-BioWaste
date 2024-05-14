import User from "../models/user-model.js";

export const showUsers = async (require, response) => {
  try {
    const users = await User.find({}).select(
      "username apartment userType plan"
    );

    response.status(200).json(users);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (require, response) => {
  try {
    const userId = require.params.id;
    await User.deleteOne({ _id: userId });

    response.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};
