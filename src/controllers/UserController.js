import UserModel from "../models/user-model.js";
import UserRepository from "../repository/UserRepository.js";
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
            id: result._id,
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
