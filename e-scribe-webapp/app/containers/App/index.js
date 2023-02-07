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
import OTPInput from 'containers/OtpInput/Loadable';
import PrescriptionDetails from 'containers/PrescriptionDetails/Loadable';
import PharmacyList from 'containers/PharmacyList/Loadable';
import DeliveryAddressSelection from 'containers/DeliveryAddressSelection/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={SplashSreen} />
        <Route exact path="/phone-login" component={PhoneLogin} />
        <Route exact path="/otp-input" component={OTPInput} />
        <Route exact path="/login-selection" component={LoginSelection} />
        <Route
          exact
          path="/prescriptions/:prescriptionNumber"
          component={PrescriptionDetails}
        />
        <Route
          exact
          path="/prescriptions/:prescriptionNumber/delivery/address-selection"
          component={DeliveryAddressSelection}
        />
        <Route
          exact
          path="/prescriptions/:prescriptionNumber/delivery/pharmacy-list"
          component={PharmacyList}
        />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
