import ResidenceModel from "../models/Residence-model.js";

export async function createResidence(newResidence) {
  try {
    return await newResidence.save();
  } catch (err) {
    throw new Error("Error creating residence: " + err);
  }
}

export async function findResidenceById(residenceId) {
  try {
    return await ResidenceModel.findOne({ id: residenceId });
  } catch (err) {
    throw new Error("Error finding residence: " + err);
  }
}

export default { createResidence, findResidenceById };
