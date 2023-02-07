import React, { useState } from 'react';
import { range } from 'lodash';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import HorizontalScrollableMenu from './index';

export default {
  title:
    'Components/HorizontalScrollableMenu/HorizontalScrollableMenuComponent',
  component: HorizontalScrollableMenu,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    onChange: { table: { disable: true } },
    groupName: { table: { disable: true } },
    defaultSelect: { table: { disable: true } },
  },
};

const Template = args => {
  const [selectedValue, setSelectedValue] = useState('1900');
  return (
    <StoryWrapper themeVariant={args.themeType}>
      <div style={{ height: 500, width: '100%' }}>
        <HorizontalScrollableMenu
          {...args}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </div>
    </StoryWrapper>
  );
};

export const DefaultMap = Template.bind({});
const items = range(1900, 2023, 1).map(val => ({ id: `${val}` }));
DefaultMap.args = {
  items,
  minorItemsNumber: 6,
};
