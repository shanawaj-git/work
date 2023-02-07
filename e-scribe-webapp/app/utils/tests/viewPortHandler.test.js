import React from 'react';
import { render } from 'react-testing-library';

import { viewPortHandler } from '../viewPortHandler';

let spy;

describe('viewPortHandler', () => {
  beforeEach(() => {
    spy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  const input = {
    event: {
      target: {
        offsetLeft: 32,
        height: 33,
        offsetTop: 34,
        getBoundingClientRect: () => ({
          height: 30,
        }),
      },
    },
    elementToBeMovedUp: {
      style: {},
    },
  };
  it('should update the styles of the sent element', () => {
    render(
      <div id="app">
        <button type="button">test button</button>
      </div>,
    );
    viewPortHandler('button')(input.event);
    expect(spy).toHaveBeenCalled();
  });
});
