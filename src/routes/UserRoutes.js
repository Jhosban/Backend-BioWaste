import { Router } from "express";
import {registerUser} from "../controllers/UserController.js";
import { loginClient } from "../controllers/LoginController.js";
import { validateSchema } from "../middlewares/middlewares.js";
import { userSchema, loginSchema } from "../schemas-validation/auth-schema.js";


const router = Router();

router.post('/registerUser',validateSchema(userSchema), registerUser);
router.post('/loginClient',validateSchema(loginSchema), loginClient);


export default router;