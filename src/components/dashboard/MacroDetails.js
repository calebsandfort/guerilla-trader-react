import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import PurgeConfirm from './PurgeConfirm';
import PasteTradesModal from './PasteTradesModal';

const MacroDetails = ({tradingAccount, setDialogVisibility,
  pasteTradesModalOpen, pastedTradesDto, updatePastedTrades, submitPastedTrades,
  purgeConfirmOpen, purge}) => {
  return (
    <div className="ui one column grid">
      <div className="column">
        <div className="ui raised pink segment" style={{paddingBottom: "5px"}}>
          <div className="ui top attached pink label">{tradingAccount.Name}</div>
          <div className="ui form" style={{display: "inline-block"}}>
            <div className="fields">
              <div className="inline field">
                <label>Net Liq:</label>
                <span>{numeral(tradingAccount.CurrentCapital).format('$0,0.00')}</span>
              </div>
              <div className="inline field">
                <label>Adj P/L:</label>
                <span>{numeral(tradingAccount.AdjProfitLoss).format('$0,0.00')}</span>
              </div>
              <div className="inline field">
                <label>Commissions:</label>
                <span>{numeral(tradingAccount.Commissions).format('$0,0.00')}</span>
              </div>
              <div className="inline field">
                <label>Total Return:</label>
                <span>{numeral(tradingAccount.TotalReturn).format('0,0.00%')}</span>
              </div>
              <div className="inline field">
                <label>R:</label>
                <span>{numeral(tradingAccount.AllPerformanceCycle.R).format('0,0.00')}</span>
              </div>
              <div className="inline field">
                <label>Max DD:</label>
                <span>{numeral(tradingAccount.AllPerformanceCycle.MaxDrawdown).format('0,0.00%')}</span>
              </div>
              <div className="inline field">
                <label>Total Trades:</label>
                <span>{numeral(tradingAccount.AllPerformanceCycle.TotalTrades).format('0,0')}</span>
              </div>
              <div className="inline field">
                <label>Win %:</label>
                <span>{numeral(tradingAccount.AllPerformanceCycle.SuccessRate).format('0,0.00%')}</span>
              </div>
              <div className="inline field" style={{paddingLeft: '2em', paddingRight: '0'}}>
                <PurgeConfirm
                  setDialogVisibility={setDialogVisibility}
                  confirmOpen={purgeConfirmOpen}
                  purge={purge} />
              </div>
              <div className="inline field" style={{paddingLeft: '0'}}>
                <PasteTradesModal
                  setDialogVisibility={setDialogVisibility}
                  modalOpen={pasteTradesModalOpen}
                  pastedTradesDto={pastedTradesDto}
                  updatePastedTrades={updatePastedTrades}
                  submitPastedTrades={submitPastedTrades} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MacroDetails.propTypes = {
  tradingAccount: PropTypes.object.isRequired
};

export default MacroDetails;
