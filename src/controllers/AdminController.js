import AdminModel from "../models/Admin-model.js";
import AdminRepository from "../repository/AdminRepository.js";
import bcrypt from "bcryptjs";
import Response from "../utils/Response.js";
import { Resend } from "resend";

export const registerAdmin = async (req, res) => {
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
            userType
          } = req.body;

          const passwordHash = await bcrypt.hash(password, 10);

          const newAdmin = new AdminModel({
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
              message: "Password don't match",
            });
          }

          const result = await AdminRepository.createAdmin(newAdmin);
          const dataSend = {
            _id: result._id,
            username: result.username,
            email: result.email,
            phoneNumber: result.phoneNumber,
            name: result.name,
            address: result.address,
            city: result.city,
            state: result.state,
            postalCode: result.postalCode,
            userType: result.userType,
          }
          Response.status = 201;
          Response.message = "Administrator created successfully";
          Response.result = dataSend;

          res.status(201).send(Response);
    } catch (err) {
        Response.status = 500;
        Response.message = "Error when registering administrator";
        Response.result = err.message;

        res.status(500).send(Response);
    }   
}

export const submitVerificationCode = async (req , res) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const email = req.params.email;

    await resend.emails.send({
      from: "BioWaste <onboarding@resend.dev>",
      to: email,
      subject: "CODIGO DE VERIFICACION",
      html: '<strong style="font-size: 40px" >1234</strong>',
    });

    Response.status = 200;
    Response.message = "Email sent successfully";
    res.status(200).send(Response);

  } catch (err) {
    Response.status = 500;
    Response.message = "Error when sending email";
    Response.result = err.message;

    res.status(500).send(Response);
  }
};
