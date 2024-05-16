import User from "../models/user-model.js";
import Admin from "../models/admin-model.js";
import Residence from "../models/residence-model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { Resend } from "resend";
import { customAlphabet } from "nanoid";

export const register = async (req, res) => {
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

    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: passwordHash,
      confirmPassword,
      apartment,
      userType,
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

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      phoneNumber: userSaved.phoneNumber,
      apartment: userSaved.apartment,
      userType: userSaved.userType,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminRegister = async (req, res) => {
  try {
    const {
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
      name,
      address,
      city,
      state,
      postalCode,
      userType,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      phoneNumber,
      password: passwordHash,
      confirmPassword,
      name,
      address,
      city,
      state,
      postalCode,
      userType,
    });

    const passwordMatch = await bcrypt.compare(
      newAdmin.confirmPassword,
      newAdmin.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Password do not match",
      });
    }

    const adminSaved = await newAdmin.save();

    const token = await createAccessToken({ id: adminSaved._id });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: adminSaved._id,
      username: adminSaved.username,
      email: adminSaved.email,
      phoneNumber: adminSaved.phoneNumber,
      name: adminSaved.name,
      address: adminSaved.address,
      city: adminSaved.city,
      state: adminSaved.state,
      postalCode: adminSaved.postalCode,
      userType: adminSaved.userType,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    const adminFound = await Admin.findOne({ username });
    const userFound = await User.findOne({ username });

    if (!userFound && !adminFound)
      return res.status(400).json({
        message: ["User not found"],
      });

    let user;
    if (userFound) {
      user = userFound;
    } else if (adminFound) {
      user = adminFound;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const createResidence = async (req, res) => {
  try {
    const {
      name,
      numberOfResidents,
      emergencyNumber,
      address,
      city,
      state,
      postalCode
    } = req.body;

    const codeID = customAlphabet("0123456789", 4);

    const newResidence = new Residence({
      _id: codeID(),
      name,
      numberOfResidents,
      emergencyNumber,
      address,
      city,
      state,
      postalCode,
    });

    const residenceSaved = await newResidence.save();

    const token = await createAccessToken({ id: residenceSaved._id });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      _id: residenceSaved._id,
      name: residenceSaved.name,
      numberOfResidents: residenceSaved.numberOfResidents,
      emergencyNumber: residenceSaved.emergencyNumber,
      address: residenceSaved.address,
      city: residenceSaved.city,
      state: residenceSaved.state,
      postalCode: residenceSaved.postalCode,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const email_send = async (email) => {
  const resend = new Resend("re_K4i38cCc_EvUCMRrtaLrV7mmPastDSmMk");

  try {
    const data = await resend.emails.send({
      from: "BioWaste <onboarding@resend.dev>",
      to: email,
      subject: "CODIGO DE VERIFICACION",
      html: '<strong style="font-size: 40px" >1234</strong>',
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
