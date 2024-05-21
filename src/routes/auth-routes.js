import { Router } from "express";
import {login, register , logout, adminRegister, createResidence, email_send} from '../controllers/auth-controllers.js';
import { validateSchema } from "../middlewares/middlewares.js";
import {registerSchema, loginSchema, adminSchema, residenceSchema} from "../schemas-validation/auth-schema.js"

const router = Router()

router.post('/register',validateSchema(registerSchema), register);
router.post("/adminRegister", validateSchema(adminSchema), adminRegister);
router.post('/login',validateSchema(loginSchema), login);
router.post('/logout', logout);
router.post('/createResidence',validateSchema(residenceSchema), createResidence);
router.post('/email_send', email_send);

export default router; 