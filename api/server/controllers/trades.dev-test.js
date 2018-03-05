//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);
chai.use(require('chai-string'));

describe('Trades', () => {

  describe('/GET filtering', () => {
    it('it should GET trades for TradingAccount 5 ', (done) => {
      chai.request(server)
        .get('/api/trades/findAndCountAll?take=10&skip=0&page=1&pageSize=10&sort[0][field]=EntryDate&sort[0][dir]=desc&filter[logic]=and&filter[filters][0][field]=TradingAccountId&filter[filters][0][operator]=eq&filter[filters][0][value]=5')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');

          for(let i = 0; i < res.body.data.length; i++){
            const trade = res.body.data[i];
            trade.TradingAccountId.should.be.eql(5);
          }

          done();
        });
    });
  });
});
