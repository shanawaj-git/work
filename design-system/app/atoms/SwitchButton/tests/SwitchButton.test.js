import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer, { act } from 'react-test-renderer';
import { render, unmountComponentAtNode } from 'react-dom';

import SwitchButton from '../index';

const shallowRenderer = new ShallowRenderer();
let container = null;

describe('SwjtchButton.js', () => {
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

  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(<SwitchButton onChange={jest.fn()} />);
      expect(tree).toBeTruthy();
    });

    it('Should display a checked switch button', () => {
      shallowRenderer.render(<SwitchButton checked onChange={jest.fn()} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display a disabled switch button', () => {
      shallowRenderer.render(<SwitchButton disabled onChange={jest.fn()} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('should call onChange function in case of onchange event happens', () => {
      const onChangeMock = jest.fn();
      const testRenderer = renderer.create(
        <SwitchButton onChange={onChangeMock} />,
      );
      const testInstance = testRenderer.root;
      const mEvent = { target: { value: 'checked' } };
      act(() => {
        testInstance.findByType(SwitchButton).props.onChange(mEvent);
      });
      expect(testRenderer).toMatchSnapshot();
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(mEvent);
    });

    it('changes value when clicked', () => {
      const onChange = jest.fn();
      act(() => {
        render(<SwitchButton onChange={onChange} />, container);
      });

      // get a hold of the input element, and trigger some clicks on it
      const input = document.querySelector('[data-testid=toggle] input');

      act(() => {
        input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(onChange).toHaveBeenCalledTimes(1);

      act(() => {
        for (let i = 0; i < 5; i += 1) {
          input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      });

      expect(onChange).toHaveBeenCalledTimes(6);
    });
  });
});
