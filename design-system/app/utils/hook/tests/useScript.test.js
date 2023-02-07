import React from 'react';
import renderer from 'react-test-renderer';
import { render, wait } from 'react-testing-library';
import PropTypes from 'prop-types';

import useScript from '../useScript';

const SampleHookTest = props => {
  const { url } = props;
  const value = useScript(url);
  return <div id="check">{value}</div>;
};

SampleHookTest.propTypes = {
  url: PropTypes.string,
};

describe('useScript.js', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  describe('index', () => {
    it('Should import succesfully', () => {
      const tree = renderer.create(
        <SampleHookTest url="https://code.jquery.com/jquery-3.6.0.slim.min.js" />,
      );
      expect(tree).toBeTruthy();
    });

    it('Should be present in DOM', async () => {
      const tree = render(
        <SampleHookTest url="https://code.jquery.com/jquery-3.6.0.slim.min.js" />,
      );
      await wait(() => {
        expect(document.querySelector('script').src).toBe(
          'https://code.jquery.com/jquery-3.6.0.slim.min.js',
        );
      });
      expect(tree).toMatchSnapshot();
    });

    it('Should throw if url is not provided', () => {
      expect(() => render(<SampleHookTest />)).toThrow(
        'You must provide a src',
      );
    });

    it('Should Only inject once', () => {
      const component = (
        <>
          <SampleHookTest url="https://code.jquery.com/jquery-3.6.0.slim.min.js" />
          <SampleHookTest url="https://code.jquery.com/jquery-3.6.0.slim.min.js" />
        </>
      );
      const tree = render(component);
      tree.rerender(component);

      expect(document.querySelectorAll('script').length).toBe(1);
    });
  });
});
