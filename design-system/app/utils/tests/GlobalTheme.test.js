/**
 * Test injectors
 */
import React from 'react';

import Button from 'atoms/Button';
import { render } from 'react-testing-library';
import { GlobalTheme } from '../globalTheme';

describe('utils', () => {
  it('Should return DEFAULT by default and modify it', () => {
    expect(GlobalTheme.getTheme()).toMatch('DEFAULT');
  });
  it('Should return Modified Value by default', () => {
    GlobalTheme.setTheme('MPC');
    expect(GlobalTheme.getTheme()).toMatch('MPC');
  });
  it('Should return Instance', () => {
    expect(typeof GlobalTheme.getInstance()).toMatch('object');
  });
  it('Should return Active theme object of the application ', () => {
    const { theme } = GlobalTheme.getActiveTheme();
    expect(theme).toBeTruthy();
  });

  it('Should Render Button with Custom Theme', () => {
    const themeEn = {
      name: 'DIA',
      theme: {
        color: {
          c100: '#000',
          c200: '#FFFFFF',
          c300: '#E8E8E6',
          c400: '#9A9D9D',
          p100: '#F6FAFB',
          p200: '#FCF7F7',
          p300: '#000',
          p400: '#535858',
        },
        overrides: {
          button: {
            borderRadius: 5,
          },
        },
      },
    };
    GlobalTheme.setTheme(themeEn);
    const tree = render(
      <Button data-testid="btn2" variant="contained">
        button
      </Button>,
    );

    const bg = getComputedStyle(tree.getByTestId('btn2')).background;
    tree.unmount();
    expect(bg).toBe('rgb(0, 0, 0)');
  });

  it('Should Render button with two different Color ', () => {
    const tree = render(
      <Button data-testid="btn" variant="contained">
        button
      </Button>,
    );
    const bg = getComputedStyle(tree.getByTestId('btn')).background;
    GlobalTheme.setTheme('MPC');
    tree.unmount();
    const tree1 = render(
      <Button data-testid="btn1" variant="contained">
        button
      </Button>,
    );
    const bg1 = getComputedStyle(tree1.getByTestId('btn1')).background;
    tree1.unmount();

    const validate = bg === bg1;
    expect(validate).toBeFalsy();
  });
});

// rgb(226, 95, 109)
