import chai from "chai";
import sinon from "sinon";
const { expect } = chai;
import chaiString from "chai-string";
chai.use(chaiString);

import UserRepository from "../src/repository/UserRepository.js";
import UserModel from "../src/models/User-model.js";

describe("Tests in user Repository", () => {
    let userSavedMock;
    let userMock;
    let usersMock;
    let stubFind;
    let stubFindOne;
    let stubUpdate;

    beforeEach(() => {
        userSavedMock = sinon.mock(new UserModel({
            username: "usertest",
            email: "ut@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
            phoneNumber: "1234567890",
            apartment: "402"
        }));
        userMock = {
            _id: "1234567890",
            username: "usertest",
            email: "ut@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
            phoneNumber: "1234567890",
            apartment: "402"
        }
        usersMock = [{
            username: "usertest",
            apartment: "402",
            plan: {
                planType: 0,
                progress: 0,
                streak: 0,  
            },
            userType: "user",
            residence: 1234
        },
        {
            username: "usertest2",
            apartment: "502",
            plan: {
                planType: 0,
                progress: 0,
                streak: 0,  
            },
            userType: "user",
            residence: 1234
        }]
        stubFind = sinon.stub(UserModel, 'find');
        stubFindOne = sinon.stub(UserModel, 'findOne');
        stubUpdate = sinon.stub(UserModel,'findByIdAndUpdate');
    });
    
    afterEach(() => {
        sinon.restore();
    });
    
    it('Should save the user in test', async () => {
        userSavedMock.expects('save').resolves(userSavedMock.object);

        const result = await UserRepository.createUser(userSavedMock.object);
        expect(result).to.equal(userSavedMock.object);
        userSavedMock.verify();
    });

    it('Should save the user in test failed', async () => {
        userSavedMock.expects('save').rejects('Error creating user');

        try {
            await UserRepository.createUser(userSavedMock.object);
        } catch (err) {
            expect(err.message).to.equal('Error creating user');
        }
        userSavedMock.verify();
    });
    
    it('Should return the user with the id', async () => {
        stubFindOne.resolves(userMock);

        const result = await UserRepository.findUserById(userMock._id);

        expect(result).to.equal(userMock);
        expect(stubFindOne.calledOnceWith({ _id: userMock._id })).to.be.true;
    });

    it('Should throw an error when find user by id fails', async () => {
        stubFindOne.resolves(userMock).rejects('Error finding user');

        try {
            await UserRepository.findUserById(userMock._id);
        } catch (err) {
            expect(err.message).to.equal('Error finding user');
        }
    });

    it('Should return the user with the username', async () => {
        stubFindOne.resolves(userMock);

        const result = await UserRepository.findUserByUsername(userMock.username);

        expect(result).to.equal(userMock);
        expect(stubFindOne.calledOnceWith({ username: userMock.username })).to.be.true;
    });

    it('Should throw an error when find user by username fails', async () => {
        stubFindOne.resolves(userMock).rejects('Error finding user');

        try {
            await UserRepository.findUserByUsername(userMock.username);
        } catch (err) {
            expect(err.message).to.equal('Error finding user');
        }
    });

    it('Should return users with the residence id', async () => {
        const residenceId = 1234;
        stubFind.withArgs({ residence: residenceId }).resolves(usersMock);

        const result = await UserRepository.findUsersByResidenceId(residenceId);
        console.log(result);

        expect(result).to.equal(usersMock);
        expect(stubFind.calledOnceWith({ residence: residenceId })).to.be.true;
    });

    it('Should update user', async () => {
        stubUpdate.resolves(userMock);
        const updatedData = {
            username: "userupdated",
            email: "userupdated@gmail.com"
        }

        const result = await UserRepository.updateUserById(userMock._id, updatedData);

        expect(result).to.equal(userMock);
        expect(stubUpdate.calledOnceWith(userMock._id, updatedData, { new: true })).to.be.true;
    });

    it('Should throw an error when update user fails', async () => {
        stubUpdate.resolves(userMock).rejects('Error updating user');

        try {
            await UserRepository.updateUserById(userMock._id, {username: 'userupdated'});
        } catch (err) {
            expect(err.message).to.equal('Error updating user');
        }
    });    
});    