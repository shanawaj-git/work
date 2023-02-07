import React from 'react';
import ListItem from './ListItem';
import StoryWrapper from 'molecules/utility/StoryWrapper';

export default {
  title: 'Components/Lists/ListItem',
  component: ListItem,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <ListItem {...args} />
  </StoryWrapper>
);

export const listItem = Template.bind({});
export const DisabledListItem = Template.bind({});
export const ListItemWithoutIcon = Template.bind({});

const icon = require('images/edit.svg');

listItem.args = {
  disabled: false,
  leftText: 'Flat / Villa No.',
  placeholder: 'Required',
  icon: icon,
};

DisabledListItem.args = {
  disabled: true,
  leftText: 'Flat / Villa No.',
  placeholder: 'Required',
  icon: icon,
};

ListItemWithoutIcon.args = {
  disabled: false,
  leftText: 'Flat / Villa No.',
  placeholder: 'Required',
};
