import UserRepository from "../repository/UserRepository.js";
import AdminRepository from "../repository/AdminRepository.js";
import bcrypt from "bcryptjs";
import moment from "moment";
import Response from "../utils/Response.js";

export const loginClient = async (req, res) => {
  try {
    const { username, password } = req.body;

    const adminFound = await AdminRepository.findAdminByUsername(username);
    const userFound = await UserRepository.findUserByUsername(username);

    if (!userFound && !adminFound)
      return res.status(404).json({
        message: "Username not found",
      });

    let client;
    if (userFound) {
      const today = moment().format("YYYY-MM-DD");
      const streak = userFound.streak;
      if(streak && moment(streak).format("YYYY-MM-DD") === today){
        streak += 1;
      } 
      await UserRepository.updateUserById(userFound._id, streak);
      client = userFound;
    } else if (adminFound) {
      client = adminFound;
    }

    const isMatch = await bcrypt.compare(password, client.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "The password is incorrect",
      });
    }

    const dataSend = {
      _id: client._id,
      username: client.username,
      email: client.email,
      phoneNumber: client.phoneNumber,
      apartment: client.apartment,
      userType: client.userType,
      residence: client.residence,
    };
    Response.status = 200;
    Response.message = "Successful login";
    Response.result = dataSend;

    res.status(200).send(Response);
  } catch (err) {
    Response.status = 500;
    Response.message = "Error when login";
    Response.result = err.message;

    res.status(500).send(Response);
  }
};
