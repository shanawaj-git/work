import React from 'react';
import renderer from 'react-test-renderer';
import Tabs, { onChange } from '../Tabs';

describe('onChange', () => {
  test('with onChangeCallback', () => {
    const setSelectedTab = jest.fn();
    const onChangeCallback = jest.fn();
    const event = { preventDefault: jest.fn() };

    onChange(setSelectedTab, onChangeCallback)(event, 'hello');

    expect(setSelectedTab).toHaveBeenCalledWith('hello');
    expect(onChangeCallback).toHaveBeenCalledWith('hello');
  });

  test('without onChangeCallback', () => {
    const setSelectedTab = jest.fn();
    const event = { preventDefault: jest.fn() };

    onChange(setSelectedTab)(event, 'hello');

    expect(setSelectedTab).toHaveBeenCalledWith('hello');
  });
});

describe('index', () => {
  const props = {
    id: 123,
  };
  it('Should import succesfully', () => {
    const tree = renderer.create(<Tabs {...props} />);
    expect(tree).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });
});
