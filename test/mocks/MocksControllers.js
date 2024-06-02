import Sinon from "sinon";

module.exports = {
    mockRequest: () => {
        const req = {
            body: {},
            params: {}
        };
        Sinon.stub(req, 'body').returns(req);
        Sinon.stub(req, 'params').returns(req);
        return req;
    },

    mockResponse: () => {
        const res = {
            send: Sinon.stub().returnsThis(),
            status: Sinon.stub().returnsThis(),
            json: Sinon.stub().returnsThis()
        };
        return res;
    }
};