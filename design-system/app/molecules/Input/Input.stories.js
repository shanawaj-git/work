/* eslint-disable react/prop-types */

import React from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import { Input } from './Input';

export default {
  title: 'Components/Inputs/Input',
  component: Input,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    icon: { table: { disable: true } },
    tooltip: { table: { disable: true } },
    classes: { table: { disable: true } },
    InputLabelProps: { table: { disable: true } },
    input: { table: { disable: true } },
    name: { table: { disable: true } },
    autoComplete: { table: { disable: true } },
    autoFocus: { table: { disable: true } },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
    inputProps: { table: { disable: true } },
    className: { table: { disable: true } },
    optional: { table: { disable: true } },
    label: {
      control: { type: 'text' },
    },
    prefix: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'select', options: ['text', 'file'] },
    },
    variant: {
      control: { type: 'select', options: ['standard'] },
    },
  },
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

const render = props => (
  <>
    <div>
      <Input {...props} />
    </div>
    <Span />
    <br />
    <br />
    <div>
      <Input {...props} disabled />
    </div>
    <Span />
    <Span />
  </>
);

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>{render(args)}</StoryWrapper>
);

export const multiline = Template.bind({});
multiline.args = {
  ...defaultProps,
  placeholder:
    'this is a multiline input which means it is vertically scrollable, horizontal scrollable is the default behaviour',
  multiline: true,
};

export const uploadFile = Template.bind({});
uploadFile.args = {
  ...defaultProps,
  type: 'file',
};

export const withStartEndromint = Template.bind({});

withStartEndromint.args = {
  ...defaultProps,
  prefix: 'USD',
};

export const withLabel = Template.bind({});
withLabel.args = {
  ...defaultProps,
  label: 'Label',
};

export const helperAndErrorText = Template.bind({});
helperAndErrorText.args = {
  ...defaultProps,
  helperText: 'Helper text',
  errorText: 'Error text',
  error: true,
};

export const errorText = Template.bind({});
errorText.args = {
  ...defaultProps,
  errorText: 'Error text',
  error: true,
};

export const helperText = Template.bind({});
helperText.args = {
  ...defaultProps,
  helperText: 'Helper text',
};
