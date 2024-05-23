import { Router } from "express";
import {registerResidence, assignUserToResidence} from "../controllers/ResidenceController.js";
import { validateSchema } from "../middlewares/Middlewares.js";
import { residenceSchema} from "../schemas-validation/Auth-schema.js";


const router = Router();

router.post('/registerResidence',validateSchema(residenceSchema), registerResidence);
router.post('/assignUserToResidence/:id', assignUserToResidence);

export default router;