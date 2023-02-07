/* eslint-disable react/prop-types */

import React from 'react';
import { PharmacyCard } from './PharmacyCard';

import StoryWrapper from 'molecules/utility/StoryWrapper';

export default {
  title: 'Components/Containers/cards/PharmacyCard',
  component: PharmacyCard,
  decorators: [Story => <StoryWrapper>{Story()}</StoryWrapper>],
};

const tickIcon = require('images/tick.svg');

const defaultProps = {
  title: 'Al Manara Pharmacy',
  subTitle: 'Al Sufouh',
  description: 'Open until 22:00',
  subDescription: '20 min',
  subDescriptionIcon: require('images/truck.svg'),
  headerImage: require('images/almanara-pharmacy.png'),
  footerIcon: tickIcon,
  footerText: 'All meds covered',
  bodyDetails: [
    {
      text: 'Hyrdoxyzine hydrochloride',
      sideText: 'AED 150.00',
      icon: tickIcon,
    },
    {
      text: 'Glimepiride-rosiglitazone',
      sideText: 'AED 150.00',
      icon: tickIcon,
    },
    { text: 'Novolin 70/30', sideText: 'AED 150.00', icon: tickIcon },
  ],
  bodySummary: [
    {
      text: 'Cost of Medicines',
      sideText: 'AED 550.00',
    },
    {
      text: 'Est. Insurance Coverage*',
      sideText: 'AED 500.00',
    },
  ],
  footerDetails: {
    buttonText: 'Select pharmacy',
    titleText: 'Your est. co-payment*',
    titleSideText: 'AED 50.00',
    caption: '*Final amounts subject to insurance coverage',
  },
};

const render = props => (
  <>
    <PharmacyCard {...props} />
  </>
);

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>{render(args)}</StoryWrapper>
);

export const expanded = Template.bind({});
expanded.args = {
  ...defaultProps,
  expanded: true,
};

export const collapsed = Template.bind({});
collapsed.args = {
  ...defaultProps,
};

export const disabled = Template.bind({});
disabled.args = {
  ...defaultProps,
  disabled: true,
};
