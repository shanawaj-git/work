import React from 'react';

import SwitchButton  from './SwitchButton';
import StoryWrapper from 'molecules/utility/StoryWrapper';

export default {
  title: 'Components/Buttons/SwitchButton',
  component: SwitchButton,
  decorators: [
    (Story) => (
		<StoryWrapper>
			{Story()}
		</StoryWrapper>
    ),
  ],
};

const Template = (args) => <SwitchButton  {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  disabled: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  disabled: false,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  checked: true,
  disabled: true,
};

export const DisabledUnchecked = Template.bind({});
DisabledUnchecked.args = {
  checked: false,
  disabled: true,
};