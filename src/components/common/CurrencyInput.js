import React from 'react';
import PropTypes from 'prop-types';

const CurrencyInput = ({name, label, onChange, placeholder, value, error}) => {
  let wrapperClass = 'field';
  if (error && error.length > 0) {
    wrapperClass += " " + 'error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="ui labeled input">
        <div className="ui label">
          $
        </div>
        <input
          type="number"
          step="0.01"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
      </div>
    </div>
  );
};

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  error: PropTypes.string
};

export default CurrencyInput;

