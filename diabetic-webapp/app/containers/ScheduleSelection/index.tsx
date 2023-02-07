import React, { useEffect, useState } from 'react';
import PropTypes, { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import {
  Typography,
  TypographyType,
  TimePicker,
  DatePicker,
  Button,
} from '@albathanext/design-system';

import momentBusinessTime from 'utils/moment-business-time';
import * as pharmacyApis from 'apis/pharmacy';
import {
  Container,
  FieldsContainer,
  MpcLogo,
  ScheduleSelectionHeader,
  HeaderContainer,
  ButtonContainer,
  Title2,
} from './styledComponents';
import { GENERIC_ERROR_CODE } from '../PhoneLogin';
import { ErrorText } from '../PhoneLogin/styledComponents';
import messages from './messages';
import * as ordersApi from '../../apis/orders';
import { Address, Pharmacy } from '../../apis/types';
const mpcGrayLogo = require('images/mpc_gray.svg');

function ScheduleSelection({
  intl,
  location,
  history,
}: ScheduleSelectionTypes) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();
  const { address }: any = location.state;
  const { prescriptionNumber } = useParams();
  const [errorCode, setErrorCode] = useState('');
  const SUMMARY_PAGE = 'summary';

  const errorMessages = {
    [ordersApi.OrderApiErrors.OrderAlreadyExists]: intl.formatMessage({
      id: 'delivery.order.exists.error',
      defaultMessage: 'You have already submitted your details.',
    }),
    [GENERIC_ERROR_CODE]: intl.formatMessage({
      id: 'delivery.schedule.error',
      defaultMessage: 'Sorry, something went wrong',
    }),
  };
  const enableProceed = selectedDate && selectedTime;
  const getErrorMessage = code =>
    errorMessages[code] || errorMessages[GENERIC_ERROR_CODE];

  const getSelectedAddress = (): Address => ({
    flatOrVillaNumber: address.flatVillaNumber,
    buildingOrVilla: address.buildingName,
    street: address.formattedText,
    directions: address.userNotes,
    latitude: address.latitude,
    longitude: address.longitude,
  });

  const toDateTime = (date, time) => {
    const dateTime = new Date(date);
    // @ts-ignore
    const [hour, minute] = time.split(':');
    dateTime.setHours(parseInt(hour, 10));
    dateTime.setMinutes(parseInt(minute, 10));
    return dateTime;
  };

  const getSelectedSchedule = () => toDateTime(selectedDate, selectedTime);

  const submitOnClick = async () => {
    try {
      setErrorCode(null);
      await ordersApi.initializeOrder({
        prescriptionNumber,
        address: getSelectedAddress(),
        schedule: getSelectedSchedule().toISOString(),
      });

      history.push({
        pathname: SUMMARY_PAGE,
      });
    } catch (err) {
      setErrorCode(err.message);
    }
  };

  const [pharmacyDetails, setpharmacyDetails] = useState<Pharmacy>();

  const initPharmacyDetails = async () => {
    try {
      const pharmacy = await pharmacyApis.fetchPharmacyDetails();
      momentBusinessTime.locale('en', pharmacy.deliveryHours);
      setpharmacyDetails(pharmacy);
    } catch (e) {
      // no date will be enabled
    }
  };

  useEffect(() => {
    initPharmacyDetails();
  }, []);

  const maxDate = pharmacyDetails
    ? new Date(Date.now() + pharmacyDetails.scheduleWindowDays * 86400000)
    : null;

  const isWorkingDay = date => momentBusinessTime(date).isWorkingDay();

  const isWorkingTime = date => momentBusinessTime(date).isWorkingTime();

  const shouldDisableDate = date => pharmacyDetails && !isWorkingDay(date.$d);
  const shouldDisableTime = time =>
    pharmacyDetails && !isWorkingTime(toDateTime(selectedDate, time));

  return (
    <Container>
      <MpcLogo src={mpcGrayLogo} />

      <HeaderContainer>
        <ScheduleSelectionHeader>
          <Typography typographyType={TypographyType.TITLE_1}>
            {intl.formatMessage(messages.scheduleSelectionPrefixLabel)}
          </Typography>
          <Title2>
            {intl.formatMessage(messages.scheduleSelectionSuffixLabel)}
          </Title2>
        </ScheduleSelectionHeader>
      </HeaderContainer>
      <FieldsContainer>
        <DatePicker
          selectedHighLightColor="#12a1c0"
          disableYearChange
          disablePast
          value={selectedDate}
          onChange={setSelectedDate}
          data-testid="selected-date"
          shouldDisableDate={shouldDisableDate}
          maxDate={maxDate}
        />
        <TimePicker
          value={selectedTime}
          onChange={setSelectedTime}
          data-testid="selected-time"
          shouldDisableTime={shouldDisableTime}
        />
      </FieldsContainer>
      <ButtonContainer>
        <Button
          variant="contained"
          onClick={submitOnClick}
          data-testid="submit-btn"
          disabled={!enableProceed}
        >
          <>{intl.formatMessage(messages.scheduleSelectionContinueButton)}</>
        </Button>
        {errorCode && (
          <ErrorText data-testid="error-text">
            <Typography typographyType={TypographyType.FOOT_NOTE}>
              {getErrorMessage(errorCode)}
            </Typography>
          </ErrorText>
        )}
      </ButtonContainer>
    </Container>
  );
}

const ScheduleSelectionPropTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      address: PropTypes.object.isRequired,
    }),
  }),
};

type ScheduleSelectionTypes = InferProps<typeof ScheduleSelectionPropTypes>;

ScheduleSelection.prototype = ScheduleSelectionPropTypes;

export default injectIntl(ScheduleSelection);
