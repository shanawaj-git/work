import PropTypes from 'prop-types';
import React from 'react';

import { FormControl, FormHelperText } from './styledComponents';

const FormControlWrapper = props => {
  const { className, error, disabled, children, helperText, errorText } = props;

  return (
    <FormControl className={className} error={error} disabled={disabled}>
      {children}

      {error && errorText && <FormHelperText>{errorText} </FormHelperText>}

      {helperText && (
        <FormHelperText error={false}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

FormControlWrapper.defaultProps = {
  className: '',
  disabled: false,
  error: false,
  helperText: '',
  errorText: '',
};

FormControlWrapper.propTypes = {
  // props
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]).isRequired,
};

export default FormControlWrapper;
