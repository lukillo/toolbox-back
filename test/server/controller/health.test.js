//Include unit testing libs.
const chai       = require('chai');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('health controller - test', ()=>{

  it('health controller', async ()=>{

    const health  = require('../../../src/server/controller/health.js')
    const jsonStub = sinon.stub().returns(true);

    const req = {
      headers:{
        'x-forwarded-for':'127.0.0.1',
        'token': 'MY_SECRET_TOKEN'
      },      
      url:'mock.com',
      method:'GET'
    };

    const res = {
      status: sinon.stub().returns({
        json:jsonStub
      })
    };
    const next = sinon.fake.returns(true);
    health(req,res,next);
    chai.expect(jsonStub.firstCall.args[0]).to.eql({"health":"OK"});

  });
  
});