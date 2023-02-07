import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import CheckboxComponentIndex from '../index';

const shallowRenderer = new ShallowRenderer();

describe('Checkbox.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(
        <CheckboxComponentIndex
          color="primary"
          value="check"
          label="test"
          labelplacement="end"
        />,
      );
      expect(tree).toBeTruthy();
    });

    it('Should display Checkbox with primary color style', () => {
      shallowRenderer.render(
        <CheckboxComponentIndex
          color="primary"
          value="check"
          label="test"
          labelplacement="end"
        />,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display disabled button', () => {
      shallowRenderer.render(
        <CheckboxComponentIndex
          disabled
          color="primary"
          value="check"
          label="test"
          labelplacement="end"
        />,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });
  });
});
