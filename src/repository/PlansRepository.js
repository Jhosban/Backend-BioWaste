import UserModel from "../models/User-model.js";

export async function getPlans(userId) {
    try {
        const user = await UserModel.findOne({ _id: userId })

        return user.plans
        
    } catch (err) {
        throw new Error("Error getting plans");
    }
}

export async function getPlan(userId, planName) {
    try {
        const user = await UserModel.findOne({ _id: userId })

        const plan = user.plans[planName];

        return plan;
    } catch (err) {
        throw new Error("Error getting plan");
    }
}

export async function savePlan(userId, planName, plan) {
    try {
        return await UserModel.findByIdAndUpdate({ _id: userId }, {
            $set: {
                [`plans.${planName}`]: plan
            }
        }, {
            new: true
        })
    } catch (err) {
        throw new Error("Error saving plan");
    }
}

export async function getStreak(userId) {
    try {
        const user = await UserModel.findOne({ _id: userId })

        return user.streak
        
    } catch (err) {
        throw new Error("Error getting streak");
    }
}

export default {
    getPlans,
    getPlan,
    savePlan,
    getStreak
  };