import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({name, label, onChange, placeholder, value, error, postfix, step = 1}) => {
  let wrapperClass = 'field';
  if (error && error.length > 0) {
    wrapperClass += " " + 'error';
  }

  let inputClass = 'ui input';
  if (postfix) {
    inputClass += " " + 'right labeled';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className={inputClass}>
        <input
          type="number"
          name={name}
          placeholder={placeholder}
          step={step}
          value={value}
          onChange={onChange} />
        {postfix && <div className="ui label">
          {postfix}
        </div>}
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  error: PropTypes.string
};

export default NumberInput;

