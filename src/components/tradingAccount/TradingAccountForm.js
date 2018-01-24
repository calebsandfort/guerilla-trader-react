import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import CurrencyInput from '../common/CurrencyInput';
import DateInput from '../common/DateInput';

export class TradingAccountForm  extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <form className="ui form">
        <h4 className="ui dividing header">Edit Account</h4>
        <div className="two fields">
          <TextInput
            name="Name"
            label="Name"
            value={this.props.tradingAccount.Name}
            onChange={this.props.onChange}
            error={this.props.errors.Name}/>

          <DateInput
            name="InceptionDate"
            label="Inception"
            value={this.props.tradingAccount.InceptionDate}
            onChange={this.props.onChange}
            error={this.props.errors.InceptionDate}/>
        </div>


        <div className="three fields">
          <CurrencyInput
            name="InitialCapital"
            label="Initial Capital"
            value={this.props.tradingAccount.InitialCapital}
            onChange={this.props.onChange}
            error={this.props.errors.InitialCapital}/>

          <CurrencyInput
            name="CurrentCapital"
            label="Current Capital"
            value={this.props.tradingAccount.CurrentCapital}
            onChange={this.props.onChange}
            error={this.props.errors.CurrentCapital}/>

          <CurrencyInput
            name="Commissions"
            label="Commissions"
            value={this.props.tradingAccount.Commissions}
            onChange={this.props.onChange}
            error={this.props.errors.Commissions}/>
        </div>

        <div className="ui divider"></div>

        <input
          type="submit"
          disabled={this.props.saving}
          value={this.props.saving ? 'Saving...' : 'Save'}
          className="ui right floated primary button"
          onClick={this.props.onSave}/>
      </form>
    );
  }
}
TradingAccountForm.propTypes = {
  tradingAccount: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default TradingAccountForm;
