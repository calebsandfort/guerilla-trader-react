import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form} from 'semantic-ui-react';

export class ToggleButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      index: 0
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    event.preventDefault();

    let newIndex = 0;

    if(this.state.index == (this.props.items.length - 1)){
      newIndex = 0;
    }
    else{
      newIndex = this.state.index + 1;
    }

    this.setState({
      index: newIndex
    });

    this.props.change([{name: this.props.name, value: this.props.items[newIndex].value}]);
  }

  render() {
    return (
      <Form.Field>
        <label>{this.props.label}</label>
        <Button fluid onClick={this.toggle}
                content={this.props.items[this.state.index].display}
                color={this.props.items[this.state.index].color}></Button>
      </Form.Field>
    );
  }
}

ToggleButton.propTypes = {
  items: PropTypes.array.isRequired
};

export default ToggleButton;
