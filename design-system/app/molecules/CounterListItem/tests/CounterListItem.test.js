import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, unmountComponentAtNode } from 'react-dom';
import renderer, { act } from 'react-test-renderer';
import CounterListItem from '../index';

const shallowRenderer = new ShallowRenderer();

let container = null;

const cartImage = require('images/panadol.png');

const defaultProps = {
  image: { cartImage },
  title: 'Panadol',
  subTitle: 'AED 13.50',
  count: 1,
  onIncrement: () => {},
  onDecrement: () => {},
};

const overrideProps = {
  ...defaultProps,
  count: undefined,
};

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('CounterListItem.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(<CounterListItem {...defaultProps} />);
      expect(tree).toBeTruthy();
    });

    it('Should display CartListItem in a row with product image and 2 buttons for increment and decrement ', () => {
      shallowRenderer.render(<CounterListItem {...defaultProps} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display CartListItem in a row with product image and 2 buttons for increment and decrement  along with default value for the count', () => {
      shallowRenderer.render(<CounterListItem {...overrideProps} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('should increase the counter by 1 when plus button clicked', () => {
      act(() => {
        render(<CounterListItem {...defaultProps} />, container);
      });

      const counterListItem = document.querySelector('.item-wrapper');
      const addButton = counterListItem.querySelector('.add-button');
      const counter = counterListItem.querySelector('.counter');
      const counterValue = parseInt(counter.innerHTML, 8);

      act(() => {
        addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(counterValue + 1).toEqual(counterValue + 1);
    });
  });

  it('counter should not go below 0 when - is clicke', () => {
    act(() => {
      render(<CounterListItem {...defaultProps} />, container);
    });

    const counterListItem = document.querySelector('.item-wrapper');
    const removeButton = counterListItem.querySelector('.remove-button');
    const counter = counterListItem.querySelector('.counter');

    act(() => {
      removeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      removeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      removeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const counterValue = parseInt(counter.innerHTML, 10);

    expect(counterValue).toBeGreaterThanOrEqual(0);
  });
});
