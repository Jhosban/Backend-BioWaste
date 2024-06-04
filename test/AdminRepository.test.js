import chai from "chai";
import sinon from "sinon";
const { expect } = chai;
import chaiString from "chai-string";
chai.use(chaiString);

import AdminRepository from "../src/repository/AdminRepository.js";
import AdminModel from "../src/models/Admin-model.js";

describe("Tests in Administrator Repository", () => {
    let adminSavedMock;
    let adminMock;
    let stubFind;
    let stubUpdate;

    beforeEach(() => {
        adminSavedMock = sinon.mock(new AdminModel({
            username: "admintest",
            email: "admintest@gmail.com",
            phoneNumber: "1234567890",
            password: "12345678",
            confirmPassword: "12345678",
            name: "admin test",
            address: "Crr 34 #34l-d",
            city: "medellin",
            state: "antioquia",
            postalCode: "050032"
        }));
        adminMock = {
            _id: "1234567890",
            username: "admintest",
            email: "admintest@gmail.com",
            phoneNumber: "1234567890",
            password: "12345678",
            confirmPassword: "12345678",
            name: "admin test",
            address: "Crr 34 #34l-d",
            city: "medellin",
            state: "antioquia",
            postalCode: "050032"
        }
        stubFind = sinon.stub(AdminModel, 'findOne');
        stubUpdate = sinon.stub(AdminModel,'findByIdAndUpdate');
    });
    
    afterEach(() => {
        sinon.restore();
    });
    
    it('Should save the administrator in test', async () => {
        adminSavedMock.expects('save').resolves(adminSavedMock.object);

        const result = await AdminRepository.createAdmin(adminSavedMock.object);
        expect(result).to.equal(adminSavedMock.object);
        adminSavedMock.verify();
    });

    it('Should save the administrator in test failed', async () => {
        adminSavedMock.expects('save').rejects('Error creating administrator');

        try {
            await AdminRepository.createAdmin(adminSavedMock.object);
        } catch (err) {
            expect(err.message).to.equal('Error creating administrator');
        }
        adminSavedMock.verify();
    });

    it('Should return the admin with the username', async () => {
        stubFind.resolves(adminMock);

        const result = await AdminRepository.findAdminByUsername(adminMock.username);

        expect(result).to.equal(adminMock);
        expect(stubFind.calledOnceWith({ username: adminMock.username })).to.be.true;
    });

    it('Should throw an error when find admin by username fails', async () => {
        stubFind.resolves(adminMock).rejects('Error finding administrator');

        try {
            await AdminRepository.findAdminByUsername(adminMock.username);
        } catch (err) {
            expect(err.message).to.equal('Error finding administrator');
        }
    });
        
    it('Should return the admin with the id', async () => {
        stubFind.resolves(adminMock);

        const result = await AdminRepository.findAdminById(adminMock._id);

        expect(result).to.equal(adminMock);
        expect(stubFind.calledOnceWith({ _id: adminMock._id })).to.be.true;
    });

    it('Should throw an error when find admin by id fails', async () => {
        stubFind.resolves(adminMock).rejects('Error finding administrator');

        try {
            await AdminRepository.findAdminByUsername(adminMock._id);
        } catch (err) {
            expect(err.message).to.equal('Error finding administrator');
        }
    });

    it('Should update the admin', async () => {
        stubUpdate.resolves(adminMock);
        const updatedData = {
            username: "adminupdated",
            email: "adminupdated@gmail.com"
        }

        const result = await AdminRepository.updateAdminById(adminMock._id, updatedData);

        expect(result).to.equal(adminMock);
        expect(stubUpdate.calledOnceWith(adminMock._id, updatedData, { new: true })).to.be.true;
    });

    it('Should throw an error when update admin fails', async () => {
        stubUpdate.resolves(adminMock).rejects('Error updating Administrator');

        try {
            await AdminRepository.updateAdminById(adminMock._id, {username: 'adminupdated'});
        } catch (err) {
            expect(err.message).to.equal('Error updating Administrator');
        }
    });    
});    