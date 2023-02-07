import React from 'react';
import CardBody from '..';

import renderer from 'react-test-renderer';

describe('index', () => {
  const data = [
    {
      icon: '',
      text: 'text',
      sideText: 'sideText',
    },
    {
      icon: '',
      text: 'text2',
      sideText: 'sideText2',
    },
  ];
  it('should render card body with data', () => {
    const tree = renderer.create(<CardBody details={data} />);
    expect(tree).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });
});
