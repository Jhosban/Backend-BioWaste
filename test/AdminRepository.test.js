import chai from "chai";
import sinon from "sinon";
import chaiString from "chai-string";
const { expect } = chai;
chai.use(chaiString);

import AdminRepository from "../src/repository/AdminRepository.js";
import AdminModel from "../src/models/Admin-model.js";



describe("Tests in Administrator Repository", () => {
    let adminSavedMock;

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
    });
    
    afterEach(() => {
        sinon.restore();
    });
    
    it('Should save the user in test', async () => {
        adminSavedMock.expects('save').resolves(adminSavedMock.object);

        const result = await AdminRepository.createAdmin(adminSavedMock.object);
        expect(result).to.equal(adminSavedMock.object);
        adminSavedMock.verify();
    });

    it('Should save the user in test failed', async () => {
        adminSavedMock.expects('save').rejects('Error creating administrator');

        try {
            await AdminRepository.createAdmin(adminSavedMock.object);
        } catch (err) {
            expect(err.message).to.equal('Error creating administrator');
        }
        adminSavedMock.verify();
    });
  });