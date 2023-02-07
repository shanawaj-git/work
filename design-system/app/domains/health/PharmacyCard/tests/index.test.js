import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, unmountComponentAtNode } from 'react-dom';
import renderer, { act } from 'react-test-renderer';

import PharmacyCard from '../index';

const shallowRenderer = new ShallowRenderer();
let container = null;

describe('Input.js', () => {
  const tickIcon = require('../../../../images/tick.svg');
  const props = {
    title: 'Al Manara Pharmacy',
    subTitle: 'Al Sufouh',
    description: 'Open until 22:00',
    subDescription: '20 min',
    subDescriptionIcon: require('../../../../images/truck.svg'),
    headerImage: require('../../../../images/almanara-pharmacy.png'),
    footerIcon: tickIcon,
    footerText: 'All meds covered',
    bodyDetails: [
      {
        text: 'Hyrdoxyzine hydrochloride',
        sideText: 'AED 150.00',
        icon: tickIcon,
      },
      {
        text: 'Glimepiride-rosiglitazone',
        sideText: 'AED 150.00',
        icon: tickIcon,
      },
      { text: 'Novolin 70/30', sideText: 'AED 150.00', icon: tickIcon },
    ],
    bodySummary: [
      {
        text: 'Cost of Medicines',
        sideText: 'AED 550.00',
      },
      {
        text: 'Est. Insurance Coverage*',
        sideText: 'AED 500.00',
      },
    ],
    footerDetails: {
      buttonText: 'Select pharmacy',
      titleText: 'Your est. co-payment*',
      titleSideText: 'AED 50.00',
      caption: '*Final amounts subject to insurance coverage',
    },
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
    it('Should import succesfully', () => {
      const tree = renderer.create(<PharmacyCard {...props} />);
      expect(tree).toBeTruthy();
      expect(tree).toMatchSnapshot();
    });

    it('Should display a disabled card', () => {
      shallowRenderer.render(<PharmacyCard {...props} />);
      const renderedOutput = shallowRenderer.getRenderOutput();

      expect(renderedOutput).toMatchSnapshot();
    });

    it('should open/close accordion when clicking on the accordion summary', () => {
      act(() => {
        render(<PharmacyCard {...props} />, container);
      });

      // get a hold of the input element, and trigger some clicks on it
      const accordion = document.querySelector('.MuiAccordionSummary-root');

      act(() => {
        accordion.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(accordion.getAttribute('aria-expanded')).toEqual('true');

      act(() => {
        accordion.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(accordion.getAttribute('aria-expanded')).toEqual('false');
    });
  });
});
