import { Router } from "express";
import {registerAdmin, submitVerificationCode} from "../controllers/AdminController.js";
import { validateSchema } from "../middlewares/Middlewares.js";
import { adminSchema } from "../schemas-validation/Auth-schema.js";


const router = Router();

router.post('/registerAdmin',validateSchema(adminSchema), registerAdmin);
router.post('/sendCode/:email', submitVerificationCode);

export default router;