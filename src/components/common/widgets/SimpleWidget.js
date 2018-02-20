import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SimpleWidget = (props) => {
  const widgetClass = `ui raised segment ${props.color}`;
  const labelClass = `ui top attached label ${props.color}`;
  
  return (
    <div className={widgetClass}>
      <div className={labelClass}>{props.title}</div>
      {props.children}
    </div>
  );
};

SimpleWidget.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SimpleWidget;
