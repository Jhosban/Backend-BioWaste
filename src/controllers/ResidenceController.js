import ResidenceModel from "../models/Residence-model.js";
import ResidenceRepository from "../repository/ResidenceRepository.js";
import AdminRepository from "../repository/AdminRepository.js";
import UserModel from "../models/User-model.js";
import UserRepository from "../repository/UserRepository.js";
import Response from "../utils/Response.js";
import { customAlphabet } from "nanoid";

export const registerResidence = async (req, res) => {
    try {
        const {
            name,
            numberOfResidents,
            emergencyNumber,
            address,
            city,
            state,
            postalCode,
            admin
          } = req.body;

          const adminFound = await AdminRepository.findAdminByUsername(admin);

        if (!adminFound) {
        return res.status(404).json({
            message: "Admin not found"
        });
        }
        const codeID = customAlphabet("0123456789", 4);

          const newResidence = new ResidenceModel({
            _id: codeID(),
            name,
            numberOfResidents,
            emergencyNumber,
            address,
            city,
            state,
            postalCode,
            admin: adminFound
          });
      
          const result = await ResidenceRepository.createResidence(newResidence);
          const dataSend = {
            _id: result._id,
            name: result.name,
            numberOfResidents: result.numberOfResidents,
            emergencyNumber: result.emergencyNumber,
            address: result.address,
            city: result.city,
            state: result.state,
            postalCode: result.postalCode,
            admin: result.admin
          }
          Response.status = 201;
          Response.message = "Residence created successfully";
          Response.result = dataSend;

          res.status(201).send(Response);
    } catch (err) {
        Response.status = 500;
        Response.message = "Error when registering the residence";
        Response.result = err.message;

        res.status(500).send(Response);
    }   
}

export const assignUserToResidence = async (req, res) => {
  try {
    const userId = req.params.id
    const residenceId = req.body.residenceId

    const residenceFind = ResidenceRepository.findResidenceById(residenceId);

    if (!residenceFind) {
      res.status(404).json({ message: "Residence not found" });
    }

    if (UserModel.residence) {
      res.status(400).json({ message: "User already has a residence" });
    }

    const result = await UserRepository.assingUserById(userId,residenceId)
    Response.status = 200;
    Response.message = "User assigned successfully";
    //Response.result = result;

    res.status(200).send(Response);
  } catch (err) {
    Response.status = 500;
    Response.message = "Error assinging user";
    Response.result = err.message;

    res.status(500).send(Response);
  }
}