import { Router } from "express";
import {getPlansByUser, getStreaksByUser, updatePlansByUser} from "../controllers/PlansController.js";

const router = Router();

router.get('/getPlans/:id', getPlansByUser);
router.get('/getPlan/:id/:planName', updatePlansByUser);
router.get('/getStreak/:id', getStreaksByUser);

export default router;