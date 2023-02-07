import classNames from 'classnames';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React from 'react';

import FormControlWrapper from 'molecules/utility/FormControlWrapper';

import { InputAdornment, TextField, UploadIcon } from './styledComponents';
const DUMMY_FUNCTION = () => {};
const Input = React.forwardRef((props, ref) => {
  const {
    label,
    prefix,
    type,
    helperText,
    disabled,
    error,
    errorText,
    autoComplete,
    autoFocus,
    classes,
    InputLabelProps,
    placeholder,
    onChange,
    multiline,
    value,
    input,
    name,
    className,

    variant,
    inputProps,
  } = props;

  let inputLabel;

  if (label) {
    inputLabel = <>{label}</>;
  }

  const startAdornment = prefix && (
    <InputAdornment
      position="start"
      classes={{
        root: classes.startAdornment,
      }}
    >
      {prefix}
    </InputAdornment>
  );

  let { icon } = props;
  if (type === 'file') {
    icon = <UploadIcon />;
  }

  const endAdornment = icon && (
    <InputAdornment
      position="end"
      classes={{
        root: classes.endAdornment,
      }}
    >
      {icon}
    </InputAdornment>
  );

  const onBlur = input?.onBlur || DUMMY_FUNCTION;
  const onFocus = input?.onFocus || DUMMY_FUNCTION;

  const events = {};
  if (onBlur) {
    events.onBlur = onBlur;
  }

  if (onFocus) {
    events.onFocus = onFocus;
  }

  // attach name only on redux-form Field
  const textFieldProps = {};
  if (input) {
    textFieldProps.inputProps = {
      ...inputProps,
      name: input.name || name,
    };
  }
  return (
    <FormControlWrapper
      helperText={helperText}
      disabled={disabled}
      error={error}
      errorText={errorText}
      className={classNames(className, classes.root)}
    >
      <TextField
        name={name}
        inputRef={ref}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        error={error}
        label={inputLabel}
        placeholder={placeholder}
        onChange={onChange}
        multiline={multiline}
        value={value}
        type={type}
        variant={variant}
        {...events}
        InputLabelProps={{
          shrink: true, // to make placeholder showing if not in focus state
          ...InputLabelProps,
          classes: {
            ...InputLabelProps?.classes,
          },
        }}
        InputProps={{
          classes: {
            input: classes.input,
            focused: classes.focused,
          },
          startAdornment,
          endAdornment,
        }}
        data-testid={get(props, 'data-testid')}
        {...textFieldProps}
      />
    </FormControlWrapper>
  );
});

Input.defaultProps = {
  icon: null,
  prefix: null,
  multiline: false,
  optional: false,
  value: undefined,
  type: 'text',
  InputLabelProps: {
    classes: {},
  },
  tooltip: null,
  classes: {},
  input: {},
  name: '',
  autoComplete: '',
  autoFocus: false,
  label: null,
  placeholder: '',
  helperText: '',
  disabled: false,
  error: false,
  errorText: '',
  className: '',
  variant: 'standard',
  inputProps: null,
};

Input.propTypes = {
  // props
  icon: PropTypes.node,
  prefix: PropTypes.node,
  optional: PropTypes.bool,
  tooltip: PropTypes.node,
  classes: PropTypes.shape({
    input: PropTypes.string,
    root: PropTypes.string,
    focused: PropTypes.string,
    endAdornment: PropTypes.string,
    startAdornment: PropTypes.string,
  }),
  InputLabelProps: PropTypes.shape({
    classes: PropTypes.shape({
      filled: PropTypes.string,
      shrink: PropTypes.string,
    }),
  }),
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  }),
  name: PropTypes.string,

  // TextField props - https://material-ui.com/api/text-field/
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  inputProps: PropTypes.shape({}),

  // FormControlWrapper props
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
};

export { Input };
export default Input;
