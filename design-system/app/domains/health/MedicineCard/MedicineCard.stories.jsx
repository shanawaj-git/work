import React from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import MedicineCard from './MedicineCard';

export default {
  title: 'Components/Containers/cards/MedicineCardComponent',
  component: MedicineCard,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    className: { table: { disable: true } },
  },
};

const cartImage = require('images/pill-icon.png');

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <MedicineCard {...args} />
  </StoryWrapper>
);

export const PrimaryMedicineCard = Template.bind({});

PrimaryMedicineCard.args = {
  image: cartImage,
  title: 'Hydroxyzine ',
  subTitle: 'Dosage:',
  description: '3 times a day, for 5 days ',
  bodyText: 'Doctors Notes: <br>Take 3 times a day, after food.',
};
