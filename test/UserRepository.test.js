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
            apartment: "402",
            residence: 1234
        }
        usersMock = [
            {
              _id: '1',
              username: 'user1',
              apartment: 'Apartment 1',
              userType: 'Type 1',
              plans: {
                plan1: {
                  progress: 50,
                },
                plan2: {
                  progress: 75,
                },
                plan3: {
                  progress: 100,
                },
              },
              streak: 3,
            },
            {
              _id: '2',
              username: 'user2',
              apartment: 'Apartment 2',
              userType: 'Type 2',
              plans: {
                plan1: {
                  progress: 25,
                },
                plan2: {
                  progress: 10,
                },
                plan3: {
                  progress: 0,
                },
              },
              streak: 5,
            },
          ];
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
        stubFind.resolves(usersMock);
        const users = await UserRepository.findUsersByResidenceId(residenceId);
        expect(users).to.be.an('array').and.to.have.lengthOf(2);
        expect(users[0]).to.deep.equal({
            _id: '1',
            username: 'user1',
            apartment: 'Apartment 1',
            userType: 'Type 1',
            plan: {
              progress: 100,
            },
            streak: 3,
          });
        expect(users[1]).to.deep.equal({
            _id: '2',
            username: 'user2',
            apartment: 'Apartment 2',
            userType: 'Type 2',
            plan: {
              progress: 25,
            },
            streak: 5,
          });
    });

    it('Should throw an error when find users by residence id fails', async () => {
        stubFind.resolves(usersMock).rejects('Error finding users');
        try {
            await UserRepository.findUsersByResidenceId(1234);
        } catch (err) {
            expect(err.message).to.equal('Error finding users');
        }
    });

    it('Should delete the user from the residence', async () => {
        const id = 123;
        stubUpdate.resolves({});

        await UserRepository.deleteUserById(id);

        expect(stubUpdate.calledOnceWith(id, { residence: null })).to.be.true;
    });

    it('Should throw an error when delete user fails', async () => {
        stubUpdate.resolves({}).rejects('Error deleting user');
        try {
            await UserRepository.deleteUserById(123);
        } catch (err) {
            expect(err.message).to.equal('Error deleting user');
        }
    });

    it('Should asign the user to the residence', async () => { 
        stubUpdate.resolves(userMock);

        const result = await UserRepository.assingUserById(userMock._id, 4321);

        expect(result).to.deep.equal(userMock);
        expect(stubUpdate.calledOnceWith(userMock._id, { $set: { residence: 4321 } }, { new: true })).to.be.true;
    });

    it('Should throw an error when asign user fails', async () => {
        stubUpdate.resolves(userMock).rejects('Error assigning user');
        try {
            await UserRepository.assingUserById(userMock._id, 4321);
        } catch (err) {
            expect(err.message).to.equal('Error assigning user');
        }
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