import UserModel from "../models/User-model.js";
import UserRepository from "../repository/UserRepository.js";
import AdminRepository from "../repository/AdminRepository.js";
import bcrypt from "bcryptjs";
import Response from "../utils/Response.js";

export const registerUser = async (req, res) => {
    try {
        const {
            username,
            email,
            phoneNumber,
            password,
            confirmPassword,
            apartment,
            userType,
          } = req.body;

          const passwordHash = await bcrypt.hash(password, 10);

          const newUser = new UserModel({
            username,
            email,
            phoneNumber,
            password: passwordHash,
            confirmPassword,
            apartment,
            userType
          });
      
          const passwordMatch = await bcrypt.compare(
            newUser.confirmPassword,
            newUser.password
          );
      
          if (!passwordMatch) {
            return res.status(400).json({
              message: "Password don't match",
            });
          }

          const result = await UserRepository.createUser(newUser);
          const dataSend = {
            _id: result._id,
            username: result.username,
            email: result.email,
            phoneNumber: result.phoneNumber,
            apartment: result.apartment,
            userType: result.userType,
          }
          Response.status = 201;
          Response.message = "User created successfully";
          Response.result = dataSend;

          res.status(201).send(Response);

          
    } catch (err) {
        Response.status = 500;
        Response.message = "Error when registering user";
        Response.result = err.message;

        res.status(500).send(Response);
    }   
}

export const showUsersByResidence = async (req, res) => {
  try {
    const residenceId = req.params.id;

    const result = await UserRepository.findUsersByResidenceId(residenceId);
    Response.status = 200;
    Response.message = "Correctly Listed Users";
    Response.result = result;

    res.status(201).send(Response);
  } catch (err) {
    Response.status = 500;
    Response.message = "Error listing users";
    Response.result = err.message;

    res.status(500).send(Response);
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;

    await UserRepository.deleteUserById(id);
    Response.status = 200;
    Response.message = "User deleted successfully";

    res.status(201).send(Response);
  } catch (err) {
    Response.status = 500;
    Response.message = "Error deleting user";
    Response.result = err.message;

    res.status(500).send(Response);
  }
}

export const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if(body.password) {
      const passwordHash = await bcrypt.hash(body.password, 10);
      body.password = passwordHash;
    }

    const adminFound = await AdminRepository.findAdminById(id)

    let result;
    if (adminFound) {
      result = await AdminRepository.updateAdminById(id, body);
    } else {
      result = await UserRepository.updateUserById(id, body);
    }

    Response.status = 200;
    Response.message = "User updated successfully";
    Response.result = result;

    res.status(200).send(Response);
  } catch (err) {
    Response.status = 500;
    Response.message = "Error updating user";
    Response.result = err.message;

    res.status(500).send(Response);
  }
}

export const findUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserRepository.findUserById(id);
    const admin = await AdminRepository.findAdminById(id);

    let result;
    if (user) {
      result = user
    }

    if (admin) {
      result = admin
    }
  
    Response.status = 200;
    Response.message = "User found successfully";
    Response.result = result;

    res.status(200).send(Response);
  } catch (err) {
    Response.status = 500;
    Response.message = "Error finding user";
    Response.result = err.message;

    res.status(500).send(Response);
  }
}