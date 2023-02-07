import React from 'react';
import PropTypes from 'prop-types';
import { StyledCounterListItem } from './StyledCounterListItem';

const CounterListItem = props => {
  const {
    className,
    image,
    title,
    subTitle,
    count = 1,
    onIncrement,
    onDecrement,
  } = props;
  return (
    <StyledCounterListItem
      className={className}
      image={image}
      title={title}
      subTitle={subTitle}
      count={count}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />
  );
};
export default CounterListItem;

CounterListItem.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  count: PropTypes.number,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

CounterListItem.defaultProps = {
  count: 1,
};
