import { Router } from "express";
import { showUsers } from "../controlers/crud-controller.js";

const router = Router()

router.get('/showUsers', showUsers)

export default router;