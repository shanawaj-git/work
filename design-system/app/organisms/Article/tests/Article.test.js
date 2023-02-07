import React from 'react';
import renderer from 'react-test-renderer';
import { unmountComponentAtNode } from 'react-dom';
import { render } from 'react-testing-library';
import Article from '../index';

describe('Article.js', () => {
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

    it('Should import succesfully', () => {
      const tree = renderer.create(<Article />);
      expect(tree).toMatchSnapshot();
    });

    it('Provided title, it should print title ', () => {
      const tree = render(<Article title="How are you doing" />);
      const check = tree.getByTestId('article-component-title');

      expect(tree.container).toMatchSnapshot();
      expect(check.innerHTML).toBe('<span> How are you doing</span>');
    });

    it('Provided title, it should print title ', () => {
      const tree = render(<Article description="How are you doing" />);
      const check = tree.getByTestId('article-component-description');

      expect(tree.container).toMatchSnapshot();
      expect(check.innerHTML).toBe('<span> How are you doing</span>');
    });

    it('Provided divider true, it should render divider ', () => {
      const tree = render(<Article divider />);
      const b = tree.getByTestId('article-component-divider');
      expect(b).toBeTruthy();
    });
  });
});
