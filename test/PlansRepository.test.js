import chai from "chai";
import sinon from "sinon";
const { expect } = chai;
import chaiString from "chai-string";
chai.use(chaiString);

import PlansRepository from "../src/repository/PlansRepository.js";
import UserModel from "../src/models/User-model.js";

describe("Tests in Plans Repository", () => {
    let stubFindOne;
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
    });
    
    afterEach(() => {
        sinon.restore();
    });
    
    it('Should return the plans of the user', async () => {
        const userId = "1234567890"; 
        stubFindOne.resolves({_id: userId, plans: plansMock});

        const result = await PlansRepository.getPlans(_id);

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
        const userId = '12345';
        const planName = 'premium';
        const expectedPlan = { planId: 'abc123', details: 'Premium plan details' };

        // Mock UserModel.findOne to return a user document with the specified plan
        UserModel.findOne.resolves({ _id: userId, plans: { [planName]: expectedPlan } });

        const plan = await getPlan(userId, planName);
        expect(plan).to.deep.equal(expectedPlan);
    });
     
});    