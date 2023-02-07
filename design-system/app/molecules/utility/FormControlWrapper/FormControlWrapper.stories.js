/* eslint-disable react/prop-types */

import React from 'react';
import { Input } from 'molecules/Input';
import StoryWrapper from '../StoryWrapper';

import FormControlWrapper from './FormControlWrapper';

export default {
  title: 'utility/FormControlWrapper',
  component: FormControlWrapper,
  decorators: [Story => <StoryWrapper>{Story()}</StoryWrapper>],
};

const defaultProps = {
  helperText: undefined,
  disabled: false,
  error: false,
  errorText: undefined,
  variant: 'standard',
};

const Span = () => <span style={{ margin: '0 10px' }}> </span>;

const render = props => {
  const { error } = props;
  return (
    <>
      <FormControlWrapper {...props}>
        <Input label="Label" error={error} />
      </FormControlWrapper>
      <Span />
      <FormControlWrapper {...props} disabled>
        <Input label="Label" disabled error={error} />
      </FormControlWrapper>
      <Span />
      <Span />
    </>
  );
};

export const helperText = () => {
  const props = {
    ...defaultProps,
    helperText: 'Helper text',
  };
  return render(props);
};

export const errorText = () => {
  const props = {
    ...defaultProps,
    errorText: 'Error text',
    error: true,
  };
  return render(props);
};

export const helperAndErrorText = () => {
  const props = {
    ...defaultProps,
    helperText: 'Helper text',
    errorText: 'Error text',
    error: true,
  };
  return render(props);
};
