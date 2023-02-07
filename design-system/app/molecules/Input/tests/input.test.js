import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { unmountComponentAtNode } from 'react-dom';
import { render } from 'react-testing-library';

import { Input } from '../index';

const shallowRenderer = new ShallowRenderer();
let container = null;

describe('Input.js', () => {
  const props = {
    name: 'testInput',
    variant: 'standard',
    onChange: jest.fn(),
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

  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = render(<Input {...props} />);
      expect(tree).toBeTruthy();
      expect(tree.container).toMatchSnapshot();
    });

    it('Should display a disabled input field', () => {
      shallowRenderer.render(<Input {...props} disabled />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display an input field for upload files', () => {
      const tree = render(<Input {...props} type="file" />);
      expect(tree).toBeTruthy();
      expect(tree.container).toMatchSnapshot();
    });

    it('Should have onBlur and onFocus if passed', () => {
      const dummyFun = jest.fn();
      const input = {
        name: 'test',
        onFocus: dummyFun,
        onBlur: dummyFun,
        onChange: jest.fn(),
      };
      shallowRenderer.render(<Input {...props} input={input} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should have a label if passed', () => {
      shallowRenderer.render(<Input {...props} label="Label" />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should show an input with a prefix', () => {
      shallowRenderer.render(<Input {...props} prefix="USD" />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });
  });
});
