import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import PharmacyList from '../index';

const MockPharmacyList = () => (
  <BrowserRouter>
    <IntlProvider locale="en">
      <PharmacyList />
    </IntlProvider>
  </BrowserRouter>
);
describe('<PharmacyList />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<MockPharmacyList />);
    expect(firstChild).toMatchSnapshot();
  });
  // TODO: change test implementation after integrating with API
  it('should render a list of pharmacies', () => {
    render(<MockPharmacyList />);
    jest.runAllTimers();
    const pharmacies = document.querySelector('.styled-spinner');
    expect(pharmacies.childNodes.length).toBeGreaterThanOrEqual(0);
  });
});
