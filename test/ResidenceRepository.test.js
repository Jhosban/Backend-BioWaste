import chai from "chai";
import sinon from "sinon";
const { expect } = chai;
import chaiString from "chai-string";
chai.use(chaiString);

import ResidenceRepository from "../src/repository/ResidenceRepository.js";
import ResidenceModel from "../src/models/Residence-model.js";

describe("Tests in Residence Repository", () => {
    let residenceSavedMock;
    let residenceMock;
    let stubFind;

    beforeEach(() => {
        residenceSavedMock = sinon.mock(new ResidenceModel({
            name: "residenciatest",
            numberOfResidents: 30,
            emergencyNumber: "0123456789",
            address: "Crr 34 #34l-d",
            city: "medellin",
            state: "antioquia",
            postalCode: "050032",
            admin: "admintest"
        }));
        residenceMock = {
            _id: 1234,
            name: "residenciatest",
            numberOfResidents: 30,
            emergencyNumber: "0123456789",
            address: "Crr 34 #34l-d",
            city: "medellin",
            state: "antioquia",
            postalCode: "050032",
            admin: "admintest"
        }
        stubFind = sinon.stub(ResidenceModel, 'findOne');
    });
    
    afterEach(() => {
        sinon.restore();
    });
    
    it('Should save the residence in test', async () => {
        residenceSavedMock.expects('save').resolves(residenceSavedMock.object);

        const result = await ResidenceRepository.createResidence(residenceSavedMock.object);
        expect(result).to.equal(residenceSavedMock.object);
        residenceSavedMock.verify();
    });

    it('Should save the residence in test failed', async () => {
        residenceSavedMock.expects('save').rejects('Error creating residence');

        try {
            await ResidenceRepository.createResidence(residenceSavedMock.object);
        } catch (err) {
            expect(err.message).to.equal('Error creating residence');
        }
        residenceSavedMock.verify();
    });
        
    it('Should return the residence with the id', async () => {
        stubFind.resolves(residenceMock);

        const result = await ResidenceRepository.findResidenceById(residenceMock._id);

        expect(result).to.equal(residenceMock);
        expect(stubFind.calledOnceWith({ _id: residenceMock._id })).to.be.true;
    });

    it('Should throw an error when find the residence by id fails', async () => {
        stubFind.resolves(residenceMock).rejects('Error finding residence');

        try {
            await ResidenceRepository.findResidenceById(residenceMock._id);
        } catch (err) {
            expect(err.message).to.equal('Error finding residence');
        }
    });  
});    