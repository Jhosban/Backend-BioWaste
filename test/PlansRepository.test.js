import chai, { should } from "chai";
import sinon from "sinon";
const { expect } = chai;
import chaiString from "chai-string";
chai.use(chaiString);

import PlansRepository from "../src/repository/PlansRepository.js";
import UserModel from "../src/models/User-model.js";

describe("Tests in Plans Repository", () => {
    let stubFindOne;
    let stubUpdate;
    let plansMock;

    beforeEach(() => {
        plansMock = {
            plan1: {
                _id: 1,
                progress: 0
            },
            plan2: {
                _id: 2,
                progress: 0
            },
            plan3: {
                _id: 3,
                progress: 0
            }
        }
        stubFindOne = sinon.stub(UserModel, 'findOne');
        stubUpdate = sinon.stub(UserModel, 'findByIdAndUpdate');
    });
    
    afterEach(() => {
        sinon.restore();
    });
    
    it('Should return the plans of the user', async () => {
        const userId = "1234567890"; 
        stubFindOne.resolves({_id: userId, plans: plansMock});

        const result = await PlansRepository.getPlans(userId);

        expect(result).to.deep.equal(plansMock);
        expect(stubFindOne.calledOnceWith({ _id: userId })).to.be.true;
    });

    it('Should throw an error when get plans fails', async () => {
        const userId = "1234567890"; 
        stubFindOne.resolves({_id: userId, plans: plansMock}).rejects('Error getting plans');  

        try {
            await PlansRepository.getPlans(userId);
        } catch (err) {
            expect(err.message).to.equal('Error getting plans');
        }
    });

    it('Should return one plan of the user', async () => {
        const userId = '1234567890';
        const planName = 'plan1';

        stubFindOne.resolves({ _id: userId, plans: { plan1: plansMock[planName] } });

        const result = await PlansRepository.getPlan(userId, planName);

        expect(result).to.deep.equal(plansMock[planName]);
        expect(stubFindOne.calledOnceWith({ _id: userId })).to.be.true;
    });

    it('Should throw an error when get plan fails', async () => {
        const userId = '1234567890';
        const planName = 'plan1';

        stubFindOne.resolves({ _id: userId, plans: { plan1: plansMock[planName] } }).rejects('Error getting plan');

        try {
            await PlansRepository.getPlan(userId, planName);
        } catch (err) {
            expect(err.message).to.equal('Error getting plan');
        }
    });

    it('Should save the plan of the user', async () => {
        const userId = '1234567890';
        const planName = 'plan1';
        const updateplan = { progress: 50 };

        stubUpdate.resolves({ _id: userId, plans: { [planName]: updateplan } });

        const result = await PlansRepository.savePlan(userId, planName, updateplan);

        expect(result.plans[planName]).to.deep.equal(updateplan);
        expect(stubUpdate.calledOnceWith({ _id: userId }, { $set: { [`plans.${planName}`]: updateplan } }, { new: true })).to.be.true;
    });

    it('Should throw an error when save plan fails', async () => {
        const userId = '1234567890';
        const planName = 'plan1';
        const updateplan = { progress: 50 };    

        stubUpdate.resolves({ _id: userId, plans: { [planName]: updateplan } }).rejects('Error saving plan');

        try {
            await PlansRepository.savePlan(userId, planName, updateplan);
        } catch (err) {
            expect(err.message).to.equal('Error saving plan');
        }
    });

    it('Should return the streak of the user', async () => {
        const userId = '1234567890';
        const expectedStreak = 0;

        stubFindOne.resolves({ _id: userId, streak: expectedStreak });

        const streak = await PlansRepository.getStreak(userId);

        expect(streak).to.equal(expectedStreak);
        expect(stubFindOne.calledOnceWith({ _id: userId })).to.be.true;
    })

    it('Should throw an error when get streak fails', async () => {
        const userId = '1234567890';
        const expectedStreak = 0;

        stubFindOne.resolves({ _id: userId, streak: expectedStreak }).rejects('Error getting streak');

        try {
            await PlansRepository.getStreak(userId);
        } catch (err) {
            expect(err.message).to.equal('Error getting streak');
        }
    });
     
});    