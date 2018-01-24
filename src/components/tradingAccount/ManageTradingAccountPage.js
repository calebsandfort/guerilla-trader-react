import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TradingAccountForm from './TradingAccountForm';
import * as tradingAccountActions from '../../actions/tradingAccountActions';
import toastr from 'toastr';
import moment from 'moment';

export class ManageTradingAccountPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tradingAccount: this.initTradingAccount(this.props.tradingAccount),
      errors: {},
      saving: false
    };

    this.saveTradingAccount = this.saveTradingAccount.bind(this);
    this.updateTradingAccountState = this.updateTradingAccountState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tradingAccount.Id != nextProps.tradingAccount.Id) {
      // Necessary to populate form when existing tradingAccount is loaded directly.
      this.setState({tradingAccount: this.initTradingAccount(nextProps.tradingAccount)});
    }
  }

  updateTradingAccountState(event) {
    const field = event.target.name;
    let tradingAccount = Object.assign({}, this.state.tradingAccount);

    switch(event.target.type){
      // case "date":
      //   tradingAccount[field] = moment(event.target.value).format();
      //   break;
      default:
        tradingAccount[field] = event.target.value;
        break;
    }

    return this.setState({tradingAccount: tradingAccount});
  }

  tradingAccountFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.tradingAccount.Name.length < 0) {
      errors.Name = 'Name must have a value.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveTradingAccount(event) {
    event.preventDefault();

    if (!this.tradingAccountFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveTradingAccount(this.state.tradingAccount)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Account saved.');
    this.props.history.push('/tradingAccounts');
  }

  initTradingAccount(tradingAccount){
    // let adjustedDate = '';
    // if(tradingAccount && tradingAccount.InceptionDate){
    //   adjustedDate = moment(tradingAccount.InceptionDate).format("YYYY-MM-DD");
    // }
    //
    // let temp = Object.assign({}, tradingAccount, {InceptionDate: adjustedDate});
    let temp = Object.assign({}, tradingAccount);
    return temp;
  }

  render() {
    return (
      <TradingAccountForm
        tradingAccount={this.state.tradingAccount}
        onChange={this.updateTradingAccountState}
        onSave={this.saveTradingAccount}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

// ManageTradingAccountPage.propTypes = {
//   tradingAccount: PropTypes.object.isRequired,
//   actions: PropTypes.object.isRequired
// };

//Pull in the React Router context so router is available on this.context.router.
// ManageTradingAccountPage.contextTypes = {
//   router: PropTypes.object
// };

function getTradingAccountById(tradingAccounts, id) {
  const tradingAccount = tradingAccounts.filter(tradingAccount => tradingAccount.Id == id);
  if (tradingAccount.length) return tradingAccount[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const tradingAccountId = ownProps.match.params.id; // from the path `/tradingAccount/:id`
  
  let tradingAccount = {Id: 0, Name: '', InitialCapital: 0.0, CurrentCapital: 0.0 , Commissions: 0.0, Active: false, InceptionDate: ''};

  if (tradingAccountId && state.tradingAccounts.length > 0) {
    tradingAccount = getTradingAccountById(state.tradingAccounts, tradingAccountId);
  }

  return {
    tradingAccount: tradingAccount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tradingAccountActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTradingAccountPage);
