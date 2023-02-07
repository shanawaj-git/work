import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render } from 'react-testing-library';

import Form from '../index';

let container = null;

describe('Form.js', () => {
  const props = {
    form: {
      firstName: {
        name: 'firstName',
        value: 'Ahmed',
      },
      city: {
        name: 'city',
        value: 'Alexandria',
      },
    },
    InputComponent: () => <input {...props} />,
    formState: jest.fn(),
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
    it('Should render inputs based on the form prop', () => {
      const tree = renderer.create(<Form {...props} />);

      renderer.create(<Form {...props} />);
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should call onChange if input field changed', async () => {
      props.onChange = jest.fn();
      act(() => {
        render(<Form {...props} />);
      });
      const input = document.querySelector('input');
      const newValue = 'update field';
      fireEvent.change(input, { target: { value: `${newValue}` } });
      expect(input.value).toEqual(`${newValue}`);
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
