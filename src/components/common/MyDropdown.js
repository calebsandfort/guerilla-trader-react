import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';
import classNames from 'classnames';

const MyDropdown = ({name, label, onChange, placeholder, value, error, items}) => {
  return (
    <Form.Field className={classNames({
                    'error': (error && error.length > 0)
                    })}>
      <label>{label}</label>
      <Dropdown name={name} fluid selection defaultValue={value} onChange={onChange} options={items}></Dropdown>
    </Form.Field>
  );
};

MyDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  error: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default MyDropdown;

