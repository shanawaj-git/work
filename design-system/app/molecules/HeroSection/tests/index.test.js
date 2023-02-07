import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';

import HeroSection from '../index';

const shallowRenderer = new ShallowRenderer();

const headerImage = require('images/header-image.png');
const logoImage = require('images/next-health-logo-primary.svg');

const defaultProps = {
  image: headerImage,
  title: 'Order placed!',
  subTitle: 'Your order is placed and will be dispatched to you shortly.',
};

describe('HeroSection.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(<HeroSection {...defaultProps} />);
      expect(tree).toBeTruthy();
    });

    it('Should display header image on top of main title and subtitle ', () => {
      shallowRenderer.render(<HeroSection {...defaultProps} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display the titleLogo when passed', () => {
      shallowRenderer.render(
        <HeroSection {...defaultProps} titleLogo={logoImage} />,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should not display the titleLogo when not passed', () => {
      shallowRenderer.render(
        <HeroSection {...defaultProps} titleLogo={null} />,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });
  });
});
