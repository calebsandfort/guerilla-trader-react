import React, {Component} from 'react';
import {Button, Confirm, Icon} from 'semantic-ui-react';
import TradingAccountService from '../../services/tradingAccountService';

export class ConfirmPurgeConfirm extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleOpen = () => {
    this.props.setDialogVisibility("purgeConfirm", true);
  };

  handleClose = () => {
    this.props.setDialogVisibility("purgeConfirm", false);
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen} icon color="red" size="mini">
          <Icon name="trash"/>
        </Button>
        <Confirm
          content="Are you sure you wish to purge?"
          size="mini"
          open={this.props.confirmOpen}
          onCancel={this.handleClose}
          onConfirm={this.props.purge}
        />
      </div>
    );
  }
}

export default ConfirmPurgeConfirm;
