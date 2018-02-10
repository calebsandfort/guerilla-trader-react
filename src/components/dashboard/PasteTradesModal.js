import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';
import TradingAccountService from '../../services/tradingAccountService';

class PasteTradesModal extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleOpen = () => {
    this.props.setDialogVisibility("pasteTradesModal", true);
  };

  handleClose = () => {
    this.props.setDialogVisibility("pasteTradesModal", false);
  };

  handleSubmit = () => {

    // TradingAccountService.purge().then(response => {
    //   if(response.data.success){
    //     this.setState({open: false});
    //   }
    // }).catch(response => {
    //   throw(response);
    // });
  }

  render() {
    return (
      <Modal
        trigger={
        <Button onClick={this.handleOpen} icon color="green" size="mini">
          <Icon name="paste"/>
        </Button>}
        open={this.props.modalOpen}
        onClose={this.handleClose}
        size="large"
      >
        <Header content="Paste Trades"/>
        <Modal.Content>
          <div className="ui form">
            <div className="field">
              <label htmlFor="Date">Date</label>
              <input name="Date" type="date" value={this.props.pastedTradesDto.Date} onChange={this.props.updatePastedTrades} />
            </div>
            <div className="field">
              <label htmlFor="Trades">Trades</label>
              <textarea name="Trades" rows="10" value={this.props.pastedTradesDto.Trades} onChange={this.props.updatePastedTrades}></textarea>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button color="green" onClick={this.props.submitPastedTrades}>
            Paste
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default PasteTradesModal;
