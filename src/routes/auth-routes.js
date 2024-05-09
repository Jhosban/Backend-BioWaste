import { Router } from "express";
import {login, registrer, logout, adminRegistrer, createResidence} from '../controlers/auth-controller.js';
import { validateSchema } from "../middelwares/validator.middelware.js";
import {registerSchema, loginSchema, adminSchema, residenceSchema} from "../schemas-validation/auth-schema.js"

const router = Router()

router.post('/registrer',validateSchema(registerSchema), registrer);
router.post("/adminRegister", validateSchema(adminSchema), adminRegistrer);
router.post('/login',validateSchema(loginSchema), login);
router.post('/logout', logout);
router.post('/createResidence',validateSchema(residenceSchema), createResidence);

export default router; 