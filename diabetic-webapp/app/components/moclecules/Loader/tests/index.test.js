import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Loader from '../index';

const renderer = new ShallowRenderer();

describe('<Loader />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<Loader />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
