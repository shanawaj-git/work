import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { MockedProvider } from '@apollo/client/testing';
import {
  PrescriptionQueries,
  PrescriptionErrorCode,
} from 'features/prescription/api/graphql';
import PrescriptionDetails from '../index';
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
const MOCK_DATA = {
  prescription: {
    prescriptionNumber: '123',
    recordNumber: '456',
    visitDate: new Date('4/12/2022'),
    diagnosis: 'deadly disease',
    pin: '123',

    patient: {
      name: {
        first: 'test',
        middle: '1',
        last: '2',
      },
      mohId: '1234',
      emiratesId: '1346',
    },

    doctor: {
      name: {
        first: 'joahn',
        middle: 'dou',
        last: 'tesae',
      },
    },

    drugs: [
      {
        name: 'panadol',

        dosage: {
          frequency: 'two',
          unit: 'capsule',
          period: 'one week',
          route: undefined,
          quantity: 'one',
          timeUnit: 'day',
          doctorNotes: 'use regularly',
        },
      },
    ],

    insurance: {
      insuranceID: '1234',
      policyNumber: '456',
      provider: {
        name: 'test insurance company',
      },
    },
  },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    prescriptionNumber: 123,
  }),
  useRouteMatch: () => ({ url: '/prescription/123' }),
}));

describe('<PrescriptionDetails />', () => {
  it('should show loader while data is being fetched', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <MockedProvider mocks={[]}>
          <PrescriptionDetails />
        </MockedProvider>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should display prescription if it is fetched correctly', async () => {
    const prescriptionMock = {
      request: {
        query: PrescriptionQueries.Prescription,
        variables: {
          input: {
            prescriptionNumber: 123,
          },
        },
      },
      result: {
        data: {
          prescription: { data: MOCK_DATA.prescription, success: true },
        },
      },
    };

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <MockedProvider
          mocks={[prescriptionMock]}
          addTypename={false}
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          <PrescriptionDetails />
        </MockedProvider>
      </IntlProvider>,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(localStorage.getItem('patientEID')).toBe('1346');
    expect(firstChild).toMatchSnapshot();
  });

  it('should hide entries where fields are missing', async () => {
    const newPrescription = {
      ...MOCK_DATA.prescription,
      patient: null,
      doctor: null,
      insurance: null,
      drugs: null,
    };

    const prescriptionMock = {
      request: {
        query: PrescriptionQueries.Prescription,
        variables: {
          input: {
            prescriptionNumber: 123,
          },
        },
      },
      result: {
        data: {
          prescription: { data: newPrescription, success: true },
        },
      },
    };

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <MockedProvider
          mocks={[prescriptionMock]}
          addTypename={false}
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          <PrescriptionDetails />
        </MockedProvider>
      </IntlProvider>,
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(firstChild).toMatchSnapshot();
  });

  it('should show error message if connectivity error happens', async () => {
    const prescriptionMock = {
      request: {
        query: PrescriptionQueries.Prescription,
        variables: {
          input: {
            prescriptionNumber: 123,
          },
        },
      },
      error: new Error('An error occurred'),
    };

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <MockedProvider
          mocks={[prescriptionMock]}
          addTypename={false}
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          <PrescriptionDetails />
        </MockedProvider>
      </IntlProvider>,
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(firstChild).toMatchSnapshot();
  });

  it('should show error message if prescription is not found', async () => {
    const prescriptionMock = {
      request: {
        query: PrescriptionQueries.Prescription,
        variables: {
          input: {
            prescriptionNumber: 123,
          },
        },
      },
      result: {
        data: {
          prescription: {
            data: null,
            success: false,
            error: { code: PrescriptionErrorCode.PrescriptionNotFound },
          },
        },
      },
    };

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <MockedProvider
          mocks={[prescriptionMock]}
          addTypename={false}
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          <PrescriptionDetails />
        </MockedProvider>
      </IntlProvider>,
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(firstChild).toMatchSnapshot();
  });

  it('should show generic error message if backend did not send error code', async () => {
    const prescriptionMock = {
      request: {
        query: PrescriptionQueries.Prescription,
        variables: {
          input: {
            prescriptionNumber: 123,
          },
        },
      },
      result: {
        data: {
          prescription: {
            data: null,
            success: false,
          },
        },
      },
    };

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <MockedProvider
          mocks={[prescriptionMock]}
          addTypename={false}
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          <PrescriptionDetails />
        </MockedProvider>
      </IntlProvider>,
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(firstChild).toMatchSnapshot();
  });

  it('should show generic error message if unknown error code error code', async () => {
    const prescriptionMock = {
      request: {
        query: PrescriptionQueries.Prescription,
        variables: {
          input: {
            prescriptionNumber: 123,
          },
        },
      },
      result: {
        data: {
          prescription: {
            data: null,
            success: false,
            error: { code: 'unknown_code' },
          },
        },
      },
    };

    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <MockedProvider
          mocks={[prescriptionMock]}
          addTypename={false}
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          <PrescriptionDetails />
        </MockedProvider>
      </IntlProvider>,
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(firstChild).toMatchSnapshot();
  });
});
