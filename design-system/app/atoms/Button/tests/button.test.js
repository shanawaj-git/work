import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';

import ButtonComponentIndex from '../index';
const shallowRenderer = new ShallowRenderer();
const dummyComponent = () => <div>button</div>;
describe('Button.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(
        <ButtonComponentIndex variant="contained">
          {dummyComponent()}
        </ButtonComponentIndex>,
      );
      expect(tree).toBeTruthy();
    });

    it('Should display button with primary color style', () => {
      shallowRenderer.render(
        <ButtonComponentIndex variant="contained">
          {dummyComponent()}
        </ButtonComponentIndex>,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display button with secondary color style', () => {
      shallowRenderer.render(
        <ButtonComponentIndex variant="outlined">
          {dummyComponent()}
        </ButtonComponentIndex>,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display loading button', () => {
      shallowRenderer.render(
        <ButtonComponentIndex variant="outlined" isLoading>
          {dummyComponent()}
        </ButtonComponentIndex>,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display disabled button', () => {
      shallowRenderer.render(
        <ButtonComponentIndex variant="outlined" disabled>
          {dummyComponent()}
        </ButtonComponentIndex>,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });
  });
});
