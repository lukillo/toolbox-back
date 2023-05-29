const chai  = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');


const responseStub = {
    status: 200,
    data: 'Hello world'
}


const axiosStub = {
    get: sinon.stub().returns(Promise.resolve(responseStub))
}

const {getSingleFile } = proxyquire('../../src/services/filesDataService', {
    axios: axiosStub
});


describe('filesDataService Test', () => {
    it('getSingleFiles succes call',async ()=>{
       
       const result = await getSingleFile('MyFileName');
       chai.expect(result).to.be.eql('Hello world');
    })

})