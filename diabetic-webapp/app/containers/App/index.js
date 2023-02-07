/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SplashSreen from 'containers/SplashScreen/Loadable';
import LoginSelection from 'containers/LoginSelection/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PhoneLogin from 'containers/PhoneLogin/Loadable';
import AddressSelection from 'containers/AddressSelection';
import OTPInput from 'containers/OtpInput/Loadable';
import PharmacyList from 'containers/PharmacyList/Loadable';
import DeliveryIntroduction from 'containers/DeliveryIntroduction/Loadable';
import PrescriptionUpload from 'containers/PrescriptionUpload/Loadable';
import PaymentOptions from 'containers/PaymentOptions';
import GlobalStyle from '../../global-styles';
import EducationalScreen from '../EducationalScreen';
import ReviewPrescription from '../ReviewPrescription';
import ScheduleSelection from '../ScheduleSelection';
import Summary from '../Summary';
import PaymentInput from '../PaymentInput';
import PaymentStatus from '../PaymentStatus';

export const ADDRESS_SELECTION = 'address-selection';
export const SCHEDULE_SELECTION = 'schedule-selection';
export const SUMMARY = 'summary';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={SplashSreen} />
        <Route exact path="/phone-login" component={PhoneLogin} />
        <Route exact path="/otp-input" component={OTPInput} />
        <Route exact path="/login-selection" component={LoginSelection} />
        <Route exact path="/educational-screen" component={EducationalScreen} />
        <Route
          exact
          path="/prescription-upload"
          component={PrescriptionUpload}
        />
        <Route
          exact
          path="/review-prescription"
          component={ReviewPrescription}
        />
        <Route exact path="/delivery" component={NotFoundPage} />
        <Route
          exact
          path="/prescriptions/:prescriptionNumber/delivery/introduction"
          component={DeliveryIntroduction}
        />
        <Route
          exact
          path="/prescriptions/:prescriptionNumber/delivery/address-selection"
          component={AddressSelection}
        />
        <Route
          exact
          path={`/prescriptions/:prescriptionNumber/delivery/${SCHEDULE_SELECTION}`}
          component={ScheduleSelection}
        />

        <Route
          exact
          path={`/prescriptions/:prescriptionNumber/delivery/${SUMMARY}`}
          component={Summary}
        />

        <Route
          exact
          path="/prescriptions/:prescriptionNumber/delivery/pharmacy-list"
          component={PharmacyList}
        />

        <Route
          exact
          path="/orders/:orderId/payments"
          component={PaymentOptions}
        />
        <Route
          exact
          path="/orders/:orderId/payments/input"
          component={PaymentInput}
        />
        <Route
          exact
          path="/orders/:orderId/payments/status"
          component={PaymentStatus}
        />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
