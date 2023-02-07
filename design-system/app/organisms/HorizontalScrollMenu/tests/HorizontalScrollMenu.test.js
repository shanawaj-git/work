import React from 'react';
import { range } from 'lodash';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import HorizontalScrollMenu from '../index';

const mock = function() {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver = mock;

const items = range(1900, 2023, 1).map(val => ({ id: `${val}` }));

describe('HorizontalScrollMenu.js', () => {
  describe('index', () => {
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
    let selectedValue = items[0].id;
    function setSelectedValue(val) {
      selectedValue = val;
    }

    it('Should import succesfully', () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      expect(tree).toMatchSnapshot();
    });

    it('Provided items, it should print first item value as selected Value on mount', () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const check = tree.getByTestId('horizontal-scroll-menu-title');
      expect(check.innerHTML).toBe('1900');
    });

    it('Provided items, it should have items length equal to number of divs ', () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const itemDivs = tree.container.getElementsByClassName(
        'react-horizontal-scrolling-menu--item',
      );
      expect(itemDivs.length).toBe(items.length);
    });

    it('Provided items, clickOnItem, it should be selected ', async () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const element = tree.getByTestId('scrollable-menu-item-1999');
      fireEvent(element, new MouseEvent('click', { bubbles: true }));
      tree.rerender(
        <HorizontalScrollMenu
          items={items}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />,
      );
      const check = await waitForElement(() => tree.getByText('1999'));

      expect(check.innerHTML).toBe('1999');
    });
    it('Provided items, wheelLeft, item should be auto selected ', async () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const element = tree.getByTestId('scrollable-menu-item-1999');
      await fireEvent.wheel(element, { deltaX: -800 });
      const check = tree.getByTestId('horizontal-scroll-menu-title');
      expect(check.innerHTML).toBeDefined();
    });

    it('Provided items, keyDown, item should be auto selected ', async () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const element = tree.getByTestId('scrollable-menu-item-1999');
      await fireEvent.keyDown(element);
      const check = tree.getByTestId('horizontal-scroll-menu-title');
      expect(check.innerHTML).toBeDefined();
    });

    it('Provided items, mouseDown, item should be auto selected ', async () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const element = tree.getByTestId('scrollable-menu-item-1999');
      await fireEvent.mouseDown(element);
      const check = tree.getByTestId('horizontal-scroll-menu-title');
      expect(check.innerHTML).toBeDefined();
    });
    it('Provided items, drag left, item should be auto selected ', async () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const element = tree.getByTestId('scrollable-menu-item-1900');
      await fireEvent.mouseDown(element);
      await fireEvent.mouseMove(element, { clientX: -1000, clientY: 0 });
      await fireEvent.mouseUp(element);
      await fireEvent.mouseDown(element);
      await fireEvent.mouseMove(element, { clientX: -1400, clientY: 0 });
      fireEvent(element, new MouseEvent('click', { bubbles: true }));
      await fireEvent.mouseUp(element);
      const check = tree.getByTestId('horizontal-scroll-menu-title');
      expect(check.innerHTML).toBeDefined();
    });
    it('Provided items, mouseMove, item should be auto selected ', async () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const element = tree.getByTestId('scrollable-menu-item-1999');
      await fireEvent.mouseMove(element, { clientX: -1000, clientY: 0 });
      const check = tree.getByTestId('horizontal-scroll-menu-title');
      expect(check.innerHTML).toBeDefined();
    });

    it('Provided items, scroll, item should be auto selected ', async () => {
      const tree = renderComponent(selectedValue, setSelectedValue);
      const centerLine = tree.getByTestId('horizontal-scroll-menu-center-line');
      jest.spyOn(centerLine, 'getBoundingClientRect').mockReturnValue({
        left: 2,
      });
      const allWithClass = Array.from(
        document.getElementsByClassName(
          'react-horizontal-scrolling-menu--item',
        ),
      );

      jest.spyOn(allWithClass[2], 'getBoundingClientRect').mockReturnValue({
        left: 2,
      });
      const elements = tree.container.getElementsByClassName(
        'react-horizontal-scrolling-menu--scroll-container',
      );
      await fireEvent.scroll(elements[0], { x: 90 });
      const check = tree.getByTestId('horizontal-scroll-menu-title');
      expect(check.innerHTML).toBeDefined();
    });
  });
});
function renderComponent(selectedValue, setSelectedValue) {
  return render(
    <HorizontalScrollMenu
      items={items}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
    />,
  );
}
