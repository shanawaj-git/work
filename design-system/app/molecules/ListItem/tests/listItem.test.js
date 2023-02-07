import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-test-renderer';
import { render as rtl } from 'react-testing-library';
import ListItemComponent from '../index';

const shallowRenderer = new ShallowRenderer();

let container = null;

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

describe('ListItem.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = rtl(<ListItemComponent leftText="Flat / Villa No." />);
      expect(tree.container).toBeTruthy();
    });

    it('Should display listItem with primary color style', () => {
      shallowRenderer.render(<ListItemComponent leftText="Flat / Villa No." />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should display disabled input', () => {
      shallowRenderer.render(
        <ListItemComponent disabled leftText="Flat / Villa No." />,
      );
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should not being able to enter text if input is disabled', () => {
      act(() => {
        render(
          <ListItemComponent disabled leftText="Flat / Villa No." />,
          container,
        );
      });
      const renderedOutput = document.querySelector('.MuiInput-root input');

      expect(renderedOutput.getAttribute('disabled')).not.toBeNull();
    });
  });
});
