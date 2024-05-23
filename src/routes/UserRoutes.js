import { Router } from "express";
import {registerUser, showUsersByResidence, deleteUserById, updateUserById, findUserById} from "../controllers/UserController.js";
import { loginClient } from "../controllers/LoginController.js";
import { validateSchema } from "../middlewares/Middlewares.js";
import { userSchema, loginSchema } from "../schemas-validation/Auth-schema.js";


const router = Router();

router.post('/registerUser',validateSchema(userSchema), registerUser);
router.post('/loginClient',validateSchema(loginSchema), loginClient);
router.get('/findUser/:id', findUserById);
router.get('/listUsers/:id', showUsersByResidence);
router.delete('/deleteUser/:id', deleteUserById);
router.put('/updateUser/:id', updateUserById);

export default router;