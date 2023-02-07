import React from 'react';
import renderer from 'react-test-renderer';

import Spinner, { getSpinnerVariantName } from '../index';

describe('<Spinner />', () => {
  it('should render dark spinner', () => {
    const tree = renderer.create(<Spinner variant="contained" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render light spinner', () => {
    const tree = renderer.create(<Spinner variant="outlined" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render dark spinner based on variant prop', () => {
    expect(getSpinnerVariantName('dark')).toEqual('IMAGE_MOCK');
  });

  it('should render light spinner based on variant prop', () => {
    expect(getSpinnerVariantName('light')).toEqual('IMAGE_MOCK');
  });
});
