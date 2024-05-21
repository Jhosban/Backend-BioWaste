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
    await User.deleteOne({ _id: userId });

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

export const assignResidenceToUser = async (userId, residenceId) => {
  try {
    const residence = await Residence.find({ _id: residenceId });

    if (!residence) {
      throw new Error("Residence Not Found");
    }

    if (User.residence) {
      throw new Error("The user already has a residence assigned to them");
    }

    await User.findByIdAndUpdate(userId, { $set: { residence: residenceId } });
  } catch (err) {
    console.error(err);
  }
};

//console.log(assignResidenceToUser("664ba3fd2e8c74913157a5ab", 9069))
