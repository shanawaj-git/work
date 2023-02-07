import React from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import { color } from './theme';
const ColorCard = props => {
  const { color: colors } = props;
  return (
    <div
      style={{
        display: 'flex',
        width: '800px',
        flexDirection: 'row',
        flexFlow: 'wrap',
      }}
    >
      {Object.keys(colors).map(colorKey => {
        return (
          <div>
            <div
              style={{
                backgroundColor: colors[colorKey],
                width: '200px',
                height: '100px',
              }}
            >
              <div
                style={{
                  background: 'white',
                  display: 'inline',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {colorKey + ` - ` + colors[colorKey]}
              </div>
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default {
  title: 'Tokens/React/Colors',
  component: ColorCard,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    color: { table: { disable: true } },
  },
  decorators: [Story => <StoryWrapper>{Story()}</StoryWrapper>],
};

const Template = args => <ColorCard {...args} />;

export const Colors = Template.bind({});
Colors.args = {
  color,
};
