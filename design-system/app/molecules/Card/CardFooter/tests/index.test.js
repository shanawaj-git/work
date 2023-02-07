import React from 'react';
import CardFooter from '..';

import renderer from 'react-test-renderer';

describe('index', () => {
  const details = {
    buttonText: 'buttonText',
    titleText: 'titleText',
    titleSideText: 'titleSideText',
    caption: 'caption',
  };
  it('should render card footer with no button', () => {
    const props = { className: 'test', shouldShowButton: false, details };

    const tree = renderer.create(<CardFooter {...props} />);
    expect(tree).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });

  it('should render card footer with button', () => {
    const props = { shouldShowButton: true, details };

    const tree = renderer.create(<CardFooter {...props} />);
    expect(tree).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });

  it('should render card footer with no details', () => {
    const props = {};

    const tree = renderer.create(<CardFooter {...props} />);
    expect(tree).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });
});
