import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, unmountComponentAtNode } from 'react-dom';
import renderer, { act } from 'react-test-renderer';
import ImageCardWithCta from '../index';

const shallowRenderer = new ShallowRenderer();

let container = null;

const icon = require('images/location-icon.svg');
const buttonIcon = require('images/arow-right.svg');

const defualtProps = {
  icon,
  title: 'We Work offices',
  subTitle: 'The Offices 4, Albatha Next, 8th floor...',
  buttonIcon,
  onClick: jest.fn(),
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

describe('ImageCardWithCta.js', () => {
  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(<ImageCardWithCta {...defualtProps} />);
      expect(tree).toBeTruthy();
    });

    it('Should display ImageCardWithCta item with icon, title, subTitle and button with icon', () => {
      shallowRenderer.render(<ImageCardWithCta {...defualtProps} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should be able to click on the arrow button in the card ', () => {
      act(() => {
        render(<ImageCardWithCta {...defualtProps} />, container);
      });

      const cardButton = document.querySelector('.image-card-button');

      act(() => {
        cardButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(defualtProps.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
