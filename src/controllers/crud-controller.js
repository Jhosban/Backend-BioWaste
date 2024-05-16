import User from "../models/user-model.js";
import Residence from "../models/residence-model.js";

export const showUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(
      "username apartment userType plan"
    );

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.deleteOne({ _id: userId });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const showResidences = async (req, res) => {
  try {
    const residence = await Residence.find({_id: req.params.id})

    res.status(200).json(residence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
