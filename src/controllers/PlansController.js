import PlansRepository from "../repository/PlansRepository.js";
import Response from "../utils/Response.js";

export const getPlansByUser = async (req, res) => {
    try { 
      const userId = req.params.id;

      if (!userId) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const result = await PlansRepository.getPlans(userId);
      Response.status = 200;
      Response.message = "Correctly Listed Plans";
      Response.result = result;
  
      res.status(200).send(Response);
    } catch (err) {
      Response.status = 500;
      Response.message = "Error listing plans";
      Response.result = err.message;
  
      res.status(500).send(Response);
    }
};

export const updatePlansByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const planName = req.params.planName;

    if (!userId || !planName) {
      return res.status(404).json({ message: "User or plans not found" });
    }

    const plan1 = await PlansRepository.getPlan(userId, "plan1");
    const plan2 = await PlansRepository.getPlan(userId, "plan2");
    const plan3 = await PlansRepository.getPlan(userId, "plan3");

    if (plan1.progress === 100 && plan2.progress === 100 && plan3.progress === 100) {
      plan1.progress = 0;
      plan2.progress = 0;
      plan3.progress = 0;
      await PlansRepository.savePlan(userId, "plan1", plan1);
      await PlansRepository.savePlan(userId, "plan2", plan2);
      await PlansRepository.savePlan(userId, "plan3", plan3);
      return res.status(200).json({ message: "plans reinitialized" });
    }

    const plan = await PlansRepository.getPlan(userId, planName);

    let progress = plan.progress;

    if (progress === 100) {
      return res.status(200).json({ message: "Plan already completed" });
    }else{
      const increment = 100 / 3;
      progress += increment;
      plan.progress = progress;
    }
    
    const result = await PlansRepository.savePlan(userId, planName, plan);

    Response.status = 200;
    Response.message = "Correctly updated Plan";
    Response.result = result;

    res.status(200).send(Response);
    } catch (err) {
      Response.status = 500;
      Response.message = "Error updating plan";
      Response.result = err.message;
  
      res.status(500).send(Response);
    }  
}

export const getStreaksByUser = async (req, res) => {
  try { 
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await PlansRepository.getStreak(userId);
    Response.status = 200;
    Response.message = "Streaks Listed";
    Response.result = result;

    res.status(200).send(Response);
  } catch (err) {
    Response.status = 500;
    Response.message = "Error streaks listing";
    Response.result = err.message;

    res.status(500).send(Response);
  }
};







