import React, {Component} from 'react';
import {Button, Confirm, Icon} from 'semantic-ui-react';
import TradingAccountService from '../../services/tradingAccountService';

export class ConfirmReconcileConfirm extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleOpen = () => {
    this.props.setDialogVisibility("reconcileConfirm", true);
  };

  handleClose = () => {
    this.props.setDialogVisibility("reconcileConfirm", false);
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen} icon color="blue" size="mini">
          <Icon name="book"/>
        </Button>
        <Confirm
          content="Are you sure you wish to reconcile?"
          size="mini"
          open={this.props.confirmOpen}
          onCancel={this.handleClose}
          onConfirm={this.props.reconcile}
        />
      </div>
    );
  }
}

export default ConfirmReconcileConfirm;
