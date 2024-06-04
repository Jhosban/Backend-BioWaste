import ResidenceModel from "../models/Residence-model.js";

export async function createResidence(newResidence) {
  try {
    return await newResidence.save();
  } catch (err) {
    throw new Error("Error creating residence");
  }
}

export async function findResidenceById(residenceId) {
  try {
    return await ResidenceModel.findOne({ _id: residenceId });
  } catch (err) {
    throw new Error("Error finding residence");
  }
}

export default { createResidence, findResidenceById };
