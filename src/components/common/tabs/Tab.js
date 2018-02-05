import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tab = ({display, index, activeIndex, updateIndex}) => {
  return (
    <div onClick={() => updateIndex(index)}
      className={classNames({
        'item': true,
        'active': index == activeIndex
      })}>
      {display}
    </div>
  );
};

Tab.propTypes = {
  display: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  updateIndex: PropTypes.func.isRequired
};

export default Tab;
