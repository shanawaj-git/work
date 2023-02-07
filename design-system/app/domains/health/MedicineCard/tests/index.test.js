import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import MedicineCard from '../index';

const shallowRenderer = new ShallowRenderer();

const pillIcon = require('images/pill-icon.png');

const defaultProps = {
  image: { pillIcon },
  title: 'Hydroxyzine',
  subTitle: 'Dosage:',
  description: '3 times a day, for 5 days',
  bodyText: 'Doctors Notes: <br> Take 3 times a day, after food.',
};

describe('MedicineCard.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(<MedicineCard {...defaultProps} />);
      expect(tree).toBeTruthy();
    });

    it('Should display Medicine Card in a container with pill image, title, sub title, description and bodyText ', () => {
      shallowRenderer.render(<MedicineCard {...defaultProps} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });
  });
});
