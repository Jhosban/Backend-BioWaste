import { Router } from "express";
import {registerResidence} from "../controllers/ResidenceController.js";
import { validateSchema } from "../middlewares/middlewares.js";
import { residenceSchema} from "../schemas-validation/auth-schema.js";


const router = Router();

router.post('/registerResidence',validateSchema(residenceSchema), registerResidence);

export default router;