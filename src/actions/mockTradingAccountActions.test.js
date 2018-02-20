import expect from 'expect';
import * as tradingAccountActions from './mockTradingAccountActions';
import * as types from '../constants/actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Mock TradingAccount Actions', () => {
  describe('createTradingAccountSuccess', () => {
    it('should create a MOCK_CREATE_TRADING_ACCOUNT_SUCCESS action', () => {
      //arrange
      const tradingAccount = {Id: '57', Name: 'Test Account'};
      const expectedAction = {
        type: types.MOCK_CREATE_TRADING_ACCOUNT_SUCCESS,
        tradingAccount: tradingAccount
      };

      //act
      const action = tradingAccountActions.createTradingAccountSuccess(tradingAccount);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Mock TradingAccount Actions Thunk', () => {
    it('should create BEGIN_AJAX_CALL and MOCK_LOAD_TRADING_ACCOUNTS_SUCCESS when loading tradingAccounts', (done) => {
      // In a real app, you'd likely make a real HTTP call.
      // To mock out that http call, you can use Nock to intercept all
      // calls to a given address or pattern. This means you can test
      // without making actual HTTP calls, and specify the data
      // your mock API should return. Since we're already hitting a mock
      // API, there's no need to call nock in this test.

      // Here's an example call to nock.
      // nock('http://example.com/')
      //   .get('/tradingAccounts')
      //   .reply(200, { body: { tradingAccount: [{ id: 'clean-code', title: 'Clean Code'}] }});

      const expectedActions = [
        {type: types.BEGIN_AJAX_CALL},
        {type: types.MOCK_LOAD_TRADING_ACCOUNTS_SUCCESS, body: {tradingAccounts: [{id: '34', title: 'Clean Code'}]}}
      ];
      const store = mockStore({tradingAccounts: []}, expectedActions, done);
      store.dispatch(tradingAccountActions.loadTradingAccounts()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        expect(actions[1].type).toEqual(types.MOCK_LOAD_TRADING_ACCOUNTS_SUCCESS);
        done();
      });
    });
  });
});
