import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';

import StoryWrapper from '../index';
const shallowRenderer = new ShallowRenderer();

const Story = () => <div>Story</div>;

describe('StoryWrapper.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(<StoryWrapper>{Story()} </StoryWrapper>);
      expect(tree).toBeTruthy();
    });

    it('Should import story embedded in the themes', () => {
      shallowRenderer.render(<StoryWrapper>{Story()} </StoryWrapper>);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });
  });
});
