/**
 * Created by calebsandfort on 2/22/18.
 */
let chai = require('chai');
let should = chai.should();
const cnbc = require("../marketDataServices").cnbc;

describe('CNBC Service', () => {

  describe('GetMarketData - Single Symbol', () => {
    it('it should get market data for supplied symbol', async () => {
      const sym = "US10Y";
      const response = await cnbc.getMarketData([sym]);
      response.data.should.be.a('object');
      response.data.QuickQuoteResult.should.be.a('object');
      response.data.QuickQuoteResult.QuickQuote.should.be.a('object');
      response.data.QuickQuoteResult.QuickQuote.symbol.should.be.eql(sym);
      parseFloat(response.data.QuickQuoteResult.QuickQuote.last).should.be.above(0.0);
    });
  });
});
