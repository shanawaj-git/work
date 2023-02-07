import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import DeliveryAddressSelection from '../index';

const MockDeliveryAddressSelection = () => (
  <BrowserRouter>
    <IntlProvider locale="en">
      <DeliveryAddressSelection />
    </IntlProvider>
  </BrowserRouter>
);

describe('<DeliveryAddressSelection />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<MockDeliveryAddressSelection />);
    expect(firstChild).toMatchSnapshot();
  });
});
