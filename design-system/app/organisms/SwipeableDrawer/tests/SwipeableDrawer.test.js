import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EnzymeToJson from 'enzyme-to-json';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-test-renderer';
import SwipeableDrawer from '../index';

configure({ adapter: new Adapter() });

const shallowRenderer = new ShallowRenderer();

const defaultProps = {
  anchor: 'bottom',
  isOpen: true,
  hideBackdrop: false,
  hasRoundedCorners: false,
  hasBlurBackground: true,
};
let container = null;
describe('shallowRenderer.js', () => {
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
    it('should dismiss the panel when clicking on the overlay', () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();
      act(() => {
        render(
          <div>
            <SwipeableDrawer isOpen onOpen={onOpen} onClose={onClose}>
              <div>test</div>
            </SwipeableDrawer>
          </div>,
          container,
        );
      });

      // initially the overlay will be shown
      expect(document.querySelector('.MuiModal-hidden')).toEqual(null);

      const overlay = document.querySelector('.MuiBackdrop-root');

      act(() => {
        overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // after clicking the overlay will be hidden
      expect(onClose).toHaveBeenCalledTimes(1);
    });
    it('Should render bottom drawer', () => {
      shallowRenderer.render(<SwipeableDrawer {...defaultProps} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('Should render left drawer', () => {
      const subject = mount(<SwipeableDrawer anchor="left" />);
      expect(EnzymeToJson(subject)).toMatchSnapshot();
    });

    it('Should render right drawer', () => {
      const subject = mount(<SwipeableDrawer anchor="right" />);
      expect(EnzymeToJson(subject)).toMatchSnapshot();
    });
    it('Should render top drawer', () => {
      const subject = mount(<SwipeableDrawer anchor="top" />);
      expect(EnzymeToJson(subject)).toMatchSnapshot();
    });

    it('render without anchor unknown', () => {
      const subject = mount(
        <SwipeableDrawer anchor="unknown" hasRoundedCorners />,
      );
      expect(EnzymeToJson(subject)).toMatchSnapshot();
    });

    it('render with rounded corners', () => {
      const subject = mount(
        <SwipeableDrawer anchor="left" hasRoundedCorners />,
      );
      expect(EnzymeToJson(subject)).toMatchSnapshot();
    });

    it('render without rounded corners', () => {
      const subject = mount(
        <SwipeableDrawer anchor="left" hasRoundedCorners={false} />,
      );
      expect(EnzymeToJson(subject)).toMatchSnapshot();
    });

    it('render with blurred background', () => {
      const subject = mount(
        <SwipeableDrawer anchor="left" hasBlurBackground />,
      );
      expect(EnzymeToJson(subject)).toMatchSnapshot();
    });

    it('render without blurred background', () => {
      const subject = mount(
        <SwipeableDrawer anchor="left" hasBlurBackground={false} />,
      );
      expect(EnzymeToJson(subject)).toMatchSnapshot();
    });
  });
});
