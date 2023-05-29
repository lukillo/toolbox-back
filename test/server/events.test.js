const chai  = require('chai');
const sinon = require('sinon');

const mockConsole = {
    info: sinon.fake(),
    error: sinon.fake()
}
const mockProcess = {
    exit: sinon.fake()
};

const { onListen, onProcessKill, onServerError , onException } = require('../../src/server/events')

describe('Events Test', () => {

    beforeEach(()=>{
        mockConsole.info.resetHistory();
        mockConsole.error.resetHistory();
        mockProcess.exit.resetHistory();
    });

    it('onListen method logs at least one message', () => {
        let spy = sinon.spy(console, 'info')
        onListen('1.1.1.1', 3000);
        chai.expect(spy.callCount).to.be.greaterThan(0);
        spy.restore();
    });

    it('onServerError method logs at least one message', () => {
        let spy = sinon.spy(console, 'error')
        onServerError();
        chai.expect(spy.callCount).to.be.greaterThan(0);
        chai.expect(spy.firstCall.args).to.be.eql([{message:`Server error`}]);
        spy.restore();
    });

    it('onException method logs at least one message', () => {
        let spy = sinon.spy(console, 'error')
        onException({ error: 'My exception'} );
        chai.expect(spy.callCount).to.be.greaterThan(0);
        chai.expect(spy.firstCall.args).to.be.eql([ { message: { error: 'My exception' } } ]);
        spy.restore();
    });

})