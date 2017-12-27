import expect from 'expect';
import tradingAccountReducer from './tradingAccountReducer';
import * as actions from '../actions/tradingAccountActions';

describe('TradingAccount Reducer', () => {
  it('should add tradingAccount when passed CREATE_TRADING_ACCOUNT_SUCCESS', () => {
    // arrange
    const initialState = [
      {Name: 'A'},
      {Name: 'B'}
    ];

    const newTradingAccount = {Name: 'C'};

    const action = actions.createTradingAccountSuccess(newTradingAccount);

    // act
    const newState = tradingAccountReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].Name).toEqual('A');
    expect(newState[1].Name).toEqual('B');
    expect(newState[2].Name).toEqual('C');
  });

  it('should update tradingAccount when passed UPDATE_TRADING_ACCOUNT_SUCCESS', () => {
    // arrange
    const initialState = [
      {Id: 1, Name: 'A'},
      {Id: 2, Name: 'B'},
      {Id: 3, Name: 'C'}
    ];

    const tradingAccount = {Id: 2, Name: 'New Title'};
    const action = actions.updateTradingAccountSuccess(tradingAccount);

    // act
    const newState = tradingAccountReducer(initialState, action);
    const updatedTradingAccount = newState.find(a => a.Id == tradingAccount.Id);
    const untouchedTradingAccount = newState.find(a => a.Id == 1);

    // assert
    expect(updatedTradingAccount.Name).toEqual('New Title');
    expect(untouchedTradingAccount.Name).toEqual('A');
    expect(newState.length).toEqual(3);
  });
});
