import React from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import Article from './index';

export default {
  title: 'Components/Article/ArticleComponent',
  component: Article,
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
  console.log({ args: args.themeType });
  return (
    <StoryWrapper themeVariant={args.themeType}>
      <div style={{ height: 500, width: 500 }}>
        <Article {...args} />
      </div>
    </StoryWrapper>
  );
};

export const DefaultMap = Template.bind({});

DefaultMap.args = {
  title: 'Hello World',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s',
  divider: true,
};
