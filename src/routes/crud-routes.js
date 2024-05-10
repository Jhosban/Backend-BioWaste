import { Router } from "express";
import { showUsers, deleteUser } from "../controlers/crud-controller.js";

const router = Router()

router.get('/showUsers', showUsers)
router.get('/deleteUser/:id', deleteUser)

export default router;  