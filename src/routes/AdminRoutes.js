import { Router } from "express";
import {registerAdmin, submitVerificationCode} from "../controllers/AdminController.js";
import { validateSchema } from "../middlewares/middlewares.js";
import { adminSchema } from "../schemas-validation/auth-schema.js";


const router = Router();

router.post('/registerAdmin',validateSchema(adminSchema), registerAdmin);
router.post('/sendCode/:email', submitVerificationCode);

export default router;