import { Router } from "express";
import { showUsers, deleteUser, showResidences } from "../controllers/crud-controller.js";

const router = Router()

router.get('/showUsers', showUsers)
router.get('/deleteUser/:id', deleteUser)
router.get('/showResidence/:id', showResidences)

export default router;  