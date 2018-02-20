//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);
chai.use(require('chai-string'));

describe('Stocks', () => {

  describe('/GET paging', () => {
    it('it should GET a page of stocks', (done) => {
      chai.request(server)
        .get('/api/stocks/findAndCountAll?take=10&skip=10&page=2&pageSize=10')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(10);
          done();
        });
    });
  });

  describe('/GET sorting', () => {
    it('it should GET stocks sorted by Name asc ', (done) => {
      chai.request(server)
        .get('/api/stocks/findAndCountAll?take=1&skip=0&page=1&pageSize=1&sort[0][field]=Name&sort[0][dir]=asc')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(1);
          res.body.data[0].Symbol.should.be.eql('MMM');
          done();
        });
    });
  });


  // describe('/GET filtering', () => {
  //   it('it should GET stocks that start with letter f and have a TotalScore >= 7 ', (done) => {
  //     chai.request(server)
  //       .get('/api/stocks/findAndCountAll?take=10&skip=0&page=1&pageSize=10&sort[0][field]=Name&sort[0][dir]=asc&filter[logic]=and&filter[filters][0][field]=Name&filter[filters][0][operator]=startswith&filter[filters][0][value]=7&filter[filters][1][field]=TotalScore&filter[filters][1][operator]=gte&filter[filters][1][value]=7')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('data');
  //         res.body.data.should.be.a('array');
  //
  //         for(let i = 0; i < res.body.data.length; i++){
  //           const stock = res.body.data[i];
  //           stock.Name.should.startsWith('F');
  //           stock.TotalScore.should.be.at.least(7);
  //         }
  //
  //         done();
  //       });
  //   });
  //});


});
