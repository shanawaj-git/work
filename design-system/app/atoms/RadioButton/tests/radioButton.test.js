import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render } from 'react-testing-library';
import RadioButtonComponentIndex from '../index';

const shallowRenderer = new ShallowRenderer();

describe('RadioButton.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = render(
        <RadioButtonComponentIndex
          groupLabel="Gender"
          row
          values={{ Male: 'boy', Female: 'girl' }}
          disabled={false}
        />,
      );
      expect(tree.container).toBeTruthy();
    });

    it('Should display RadioButton with primary color style', () => {
      shallowRenderer.render(
        <RadioButtonComponentIndex
          groupLabel="Gender"
          row
          values={{ Male: 'boy', Female: 'girl' }}
          disabled={false}
        />,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display disabled RadioButton', () => {
      shallowRenderer.render(
        <RadioButtonComponentIndex
          groupLabel="Gender"
          row
          disabled
          values={{ Male: 'boy', Female: 'girl' }}
        />,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });
  });
});
