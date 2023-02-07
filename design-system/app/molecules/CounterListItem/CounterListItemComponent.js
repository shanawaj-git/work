import React, { useState } from 'react';
import Image from 'atoms/Image';
import PropTypes from 'prop-types';
import Typography, { TypographyType } from 'atoms/Typography';

export const CounterListItemComponent = props => {
  const {
    className,
    image,
    title,
    subTitle,
    count = 1,
    onIncrement,
    onDecrement,
  } = props;

  const [counter, setCounter] = useState(count);

  const incrementCounter = () => {
    setCounter(counter + 1);
    onIncrement(counter);
  };

  const decrementCounter = () => {
    const result = counter <= 0 ? counter : counter - 1;
    setCounter(result);
    onDecrement(result);
  };

  return (
    <div className={className}>
      <div className="item-wrapper">
        <div className="image">
          <Image src={image} alt={title} />
        </div>
        <div className="item-details">
          <Typography typographyType={TypographyType.HEAD_LINE}>
            {title}
          </Typography>
          <Typography typographyType={TypographyType.FOOT_NOTE}>
            {subTitle}
          </Typography>
        </div>
        <div className="cart-buttons">
          <button
            type="button"
            className="remove-button"
            onClick={decrementCounter}
          >
            {'-'}
          </button>
          <span className="counter">{counter}</span>
          <button
            type="button"
            className="add-button"
            onClick={incrementCounter}
          >
            {'+'}
          </button>
        </div>
      </div>
    </div>
  );
};

CounterListItemComponent.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  count: PropTypes.number,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

CounterListItemComponent.defaultProps = {
  count: 1,
};
