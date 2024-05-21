import { Router } from "express";
import { showUsers, deleteUser, showResidences, updateUser, assignResidenceToUser } from "../controllers/crud-controller.js";

const router = Router()

router.get('/showUsers/:id', showUsers)
router.delete('/deleteUser/:id', deleteUser)
router.get('/showResidence/:id', showResidences)
router.put('/updateUser/:id', updateUser)
router.post('/assignResidenceToUser/:id', assignResidenceToUser);

export default router;  