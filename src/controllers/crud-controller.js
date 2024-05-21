import User from "../models/user-model.js";
import Residence from "../models/residence-model.js";

export const showUsers = async (req, res) => {
  try {
    const residenceId = req.params.id;

    const users = await User.find({ residence: residenceId })
      .select("username apartment userType plan")
      .lean();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    await User.findByIdAndDelete({ _id: userId });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const showResidences = async (req, res) => {
  try {
    const residence = await Residence.find({ _id: req.params.id });

    res.status(200).json(residence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(userUpdated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const assignResidenceToUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const residenceId = req.body.residenceId;

    const residence = await Residence.find({ _id: residenceId });

    if (!residence) {
      res.status(404).json({ message: "Residence not found" });
    }

    if (User.residence) {
      res.status(400).json({ message: "User already has a residence" });
    }

    await User.findByIdAndUpdate(userId, { $set: { residence: residenceId } });

    res.status(200).json({ message: "Residence assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
