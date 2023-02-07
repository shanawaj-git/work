import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-test-renderer';
import { render as rtl } from 'react-testing-library';
import RadioListItem from '../index';

const shallowRenderer = new ShallowRenderer();

let container = null;
const props = {
  values: {
    Male: {
      title: 'Near My Current Location',
      subTitle: 'Collect from a location near you',
    },
    Female: {
      title: 'Near My Current Location',
      subTitle: 'Collect from a location near you',
    },
  },
  groupName: 'radio-button-group',
  disabled: false,
  onChange: () => {},
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

describe('RadioListItem.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = rtl(<RadioListItem {...props} />);
      expect(tree.container).toBeTruthy();
    });

    it('Should display RadioListItem with primary color style as list with white background card', () => {
      shallowRenderer.render(<RadioListItem {...props} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display disabled radio button', () => {
      const overridenProps = {
        ...props,
        disabled: true,
      };
      shallowRenderer.render(<RadioListItem {...overridenProps} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should not being able to click on the item if list item is disabled', () => {
      const overridenProps = {
        ...props,
        disabled: true,
      };
      act(() => {
        render(<RadioListItem {...overridenProps} />, container);
      });
      const renderedOutput = document.querySelector('.MuiRadio-root input');

      expect(renderedOutput.getAttribute('disabled')).not.toBeNull();
    });

    it('Should be able to switch selected radio button ', () => {
      act(() => {
        render(<RadioListItem {...props} />, container);
      });

      const activeRadioButton = document.querySelector(
        '.radio-list-item.active',
      );

      expect(activeRadioButton).toBeNull();

      const radioButton = document.querySelector(
        '.radio-list-item:first-child',
      );

      act(() => {
        radioButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(radioButton).not.toBeNull();
    });
  });
});
