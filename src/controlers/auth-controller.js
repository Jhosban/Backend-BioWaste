import User from '../models/user-model.js';
import Admin from '../models/admin-model.js';
import Residence from '../models/residence-model.js';
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'


export const registrer = async (require, response) => {
    try {
        const { username, email, phoneNumber, password, confirmPassword } = require.body;

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            phoneNumber,
            password: passwordHash,
            confirmPassword,
        });

        const passwordMatch = await bcrypt.compare(newUser.confirmPassword, newUser.password);

        if (!passwordMatch) {
            return response.status(400).json({ 
                message: 'Password do not match'
            })
        }

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id, });

        response.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        response.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            phoneNumber: userSaved.phoneNumber,
        });
    } catch (err) {
        response.status(500).json({ message: err.message });
    }

};

export const adminRegistrer = async (require, response) => {
    try {
        const { username, email, phoneNumber, password, confirmPassword, name, address, city, state, postalCode } = require.body;

        const passwordHash = await bcrypt.hash(password, 10)

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
            postalCode
        });

        const passwordMatch = await bcrypt.compare(newAdmin.confirmPassword, newAdmin.password);

        if (!passwordMatch) {
            return response.status(400).json({ 
                message: 'Password do not match' 
            })
        }

        const adminSaved = await newAdmin.save();

        const token = await createAccessToken({ id: adminSaved._id, });

        response.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        response.json({
            id: adminSaved._id,
            username: adminSaved.username,
            email: adminSaved.email,
            phoneNumber: adminSaved.phoneNumber,
            name: adminSaved.name,
            address: adminSaved.address,
            city: adminSaved.city,
            state: adminSaved.state,
            postalCode: adminSaved.postalCode,
        });
    } catch (err) {
        response.status(500).json({ message: err.message });
    }

};

export const login = async (require, response) => {
    try {
        const { username, password } = require.body;
        const userFound = await User.findOne({ username });

        if (!userFound)
            return response.status(400).json({
                message: ["User not found"],
            });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return response.status(400).json({
                message: ["The password is incorrect"],
            });
        }

        const token = await createAccessToken({ id: userFound._id, });

        response.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        response.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            phoneNumber: userFound.phoneNumber,
        });
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
};

export const logout = async (require, response) => {
    response.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    return response.sendStatus(200);
};

export const createResidence = async (require, response) => {
    try {
        const { name, numberOfResidents, emergencyNumber, address, city, state, postalCode } = require.body;

        const newResidence = new Residence({
            name,
            numberOfResidents,
            emergencyNumber,
            address,
            city,
            state,
            postalCode
        });

        const residenceSaved = await newResidence.save();

        const token = await createAccessToken({ id: residenceSaved._id, });

        response.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        response.json({
            id: residenceSaved._id,
            name: residenceSaved.name,
            numberOfResidents: residenceSaved.numberOfResidents,
            emergencyNumber: residenceSaved.emergencyNumber,
            address: residenceSaved.address,
            city: residenceSaved.city,
            state: residenceSaved.state,
            postalCode: residenceSaved.postalCode,
        });
    } catch (err) {
        response.status(500).json({ message: err.message });
    }

};
