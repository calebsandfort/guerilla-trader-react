import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class YayNayButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    //data, height, displayKey, valueKey, strokeColor
    this.state = {
      yay: this.props.yay
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    this.setState({
      yay: !this.state.yay
    });
  }

  render() {
    return (
      <button onClick={this.onClick} className={classNames({
                    'ui': true,
                    'circular': true,
                    'icon': true,
                    'button': true,
                    'green': this.state.yay,
                    'red': !this.state.yay
                  })}>
        <i className={classNames({
                    'icon': true,
                    'check': this.state.yay,
                    'ban': !this.state.yay
                  })}></i>
      </button>
    );
  }
}

YayNayButton.propTypes = {
  yay: PropTypes.bool.isRequired
};

export default YayNayButton;
