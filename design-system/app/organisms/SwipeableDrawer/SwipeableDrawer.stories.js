/* eslint-disable react/prop-types */

import React from 'react';
import Image from 'atoms/Image';

import StoryWrapper from 'molecules/utility/StoryWrapper';
import SwipeableDrawer from './SwipeableDrawer';

export default {
  title: 'Components/Containers/Panels/SlidingPanel',
  component: SwipeableDrawer,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    children: { table: { disable: true } },
    others: { table: { disable: true } },
  },
};

const defaultProps = {
  anchor: 'bottom',
  isOpen: true,
  hideBackdrop: false,
  hasRoundedCorners: false,
  hasBlurBackground: false,
  modalHeightInPercent: 40,
  modalWidthInPercent: 100,
};

const render = props => (
  <>
    {props.hasBlurBackground && (
      <div style={{ position: 'absolute', bottom: '20%' }}>
        <Image src={require('images/almanara-pharmacy.png')} />
        <Image src={require('images/almanara-pharmacy.png')} />
        {`text`}
      </div>
    )}

    <SwipeableDrawer {...props}>
      <div>Hello world</div>
    </SwipeableDrawer>
  </>
);

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>{render(args)}</StoryWrapper>
);

export const FromBottom = Template.bind({});
FromBottom.args = {
  ...defaultProps,
};

export const FromBottomRoundedCorners = Template.bind({});
FromBottomRoundedCorners.args = {
  ...defaultProps,
  hasRoundedCorners: true,
};

export const FromLeft = Template.bind({});
FromLeft.args = {
  ...defaultProps,
  anchor: 'left',
  modalHeightInPercent: 100,
  modalWidthInPercent: 20,
};

export const FromLeftRoundedCorners = Template.bind({});
FromLeftRoundedCorners.args = {
  ...defaultProps,
  hasRoundedCorners: true,
  anchor: 'left',
  modalHeightInPercent: 100,
  modalWidthInPercent: 20,
};

export const FromTop = Template.bind({});
FromTop.args = {
  ...defaultProps,
  anchor: 'top',
};

export const FromTopRoundedCorners = Template.bind({});
FromTopRoundedCorners.args = {
  ...defaultProps,
  hasRoundedCorners: true,
  anchor: 'top',
};

export const FromRight = Template.bind({});
FromRight.args = {
  ...defaultProps,
  anchor: 'right',
  modalHeightInPercent: 100,
  modalWidthInPercent: 20,
};

export const FromRightRoundedCorners = Template.bind({});
FromRightRoundedCorners.args = {
  ...defaultProps,
  hasRoundedCorners: true,
  anchor: 'right',
  modalHeightInPercent: 100,
  modalWidthInPercent: 20,
};

export const WithoutOverlay = Template.bind({});
WithoutOverlay.args = {
  ...defaultProps,
  hideBackdrop: true,
};

export const Blurry = Template.bind({});
Blurry.args = {
  ...defaultProps,
  hideBackdrop: true,
  hasBlurBackground: true,
};

export const BlurryWithRoundCorners = Template.bind({});
BlurryWithRoundCorners.args = {
  ...defaultProps,
  hideBackdrop: true,
  hasBlurBackground: true,
  hasRoundedCorners: true,
};
