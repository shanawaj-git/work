import React from 'react';
import PropTypes from 'prop-types';
import { selectSpinnerVariant } from './functions';
import Spinner from '../Spinner';
import { StyledButton } from './StyledButton';

const Button = props => {
  const {
    children,
    variant,
    onClick,
    isLoading,
    color,
    disabled,
    ...otherProps
  } = props;
  return (
    <StyledButton
      {...otherProps}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      colorStyle={variant === 'contained' ? 'primary' : 'secondary'}
    >
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </div>
      {isLoading && <Spinner variant={selectSpinnerVariant(variant)} />}
    </StyledButton>
  );
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
  color: PropTypes.string,
};
