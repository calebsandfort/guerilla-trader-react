import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TabContent = (props) => {
  return (
    <div className={classNames({
        'ui': true,
        'tab': true,
        'active': props.index == props.activeIndex
      })}>
      {props.children}
    </div>
  );
};

TabContent.propTypes = {
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired
};

export default TabContent;
