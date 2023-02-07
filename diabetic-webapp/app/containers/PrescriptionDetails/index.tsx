import React, { useState, useEffect } from 'react';
import { MedicineCard, TypographyType } from '@albathanext/design-system';
import PatientDetails from 'components/organism/PatientDetails';
import { any } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import LoadingOverlay from 'react-loading-overlay';
import { injectIntl } from 'react-intl';
import { useParams } from "react-router-dom";
import {
  Prescription,
  PrescriptionQueries,
  Drug
} from 'features/prescription/api/graphql';
import { colorSelector } from 'themes';
import messages from './messages';
import {
  Container,
  SectionWrapper,
  SectionTitle,
  Diagnosis,
  FullScreenContainer
} from './styledComponents';
import SubModule from 'utils/constants/env';
import { getMediaURL } from 'utils/url';

const GENERIC_ERROR_CODE = 'GENERIC_ERROR_CODE';


function PrescriptionDetails({ intl }) {
  const [prescription, setPrescription] = useState(null);
  const [errorCode, setErrorCode] = useState('');
  const { prescriptionNumber } = useParams();

  const getErrorMessage = () => {
    return messages[errorCode] || messages.GENERIC_ERROR_CODE;
  };

  const { loading, error, data } = useQuery(PrescriptionQueries.Prescription, {
    context:{module: SubModule.PRESCRIPTION},
    variables: {
      input: {
        prescriptionNumber,
      }
    }
  });


  useEffect(() => {
	if(data?.prescription?.success) {
		const prescriptionData= data.prescription.data as Prescription;
		setPrescription(prescriptionData);
    // TODO: Replace local storage with redux
    localStorage.setItem("patientEID",prescriptionData?.patient?.emiratesId)
		setErrorCode(null);
	} else if (data?.prescription?.success === false) {
		setErrorCode(data.prescription.error?.code || GENERIC_ERROR_CODE);
	}

	if(error) {
		setErrorCode(GENERIC_ERROR_CODE);
	}
  })

  const drugs = prescription?.drugs;
  const diagnosis = prescription?.diagnosis;

  return (
    <LoadingOverlay active={loading} spinner text={intl.formatMessage(messages.loadingPrescription)} styles={{overlay: (base) => ({
		...base,
		background: colorSelector('p300')
	  }) }}>
      { prescription && <Container>
        <PatientDetails prescription={prescription} />
        <SectionWrapper>
          <SectionTitle typographyType={TypographyType.TITLE_2}>
            <FormattedMessage {...messages.yourDiagnosis} />
          </SectionTitle>
          {diagnosis && <Diagnosis>{diagnosis}</Diagnosis>}
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle typographyType={TypographyType.TITLE_2}>
            <FormattedMessage {...messages.yourPrescription} />
          </SectionTitle>

          {drugs &&
            drugs.length &&
            drugs.map((drug: Drug,index: number) => {
              const { dosage, name } = drug;
              const { doctorNotes, frequency, timeUnit, period } = dosage;
              return (
                <MedicineCard
                  bodyText={doctorNotes}
                  description={`${frequency} times a ${timeUnit} for ${period} ${timeUnit}s`}
                  image={getMediaURL(intl, 'pill-icon.svg')}
                  subTitle={`${intl.formatMessage(messages.dosage)}:`}
                  title={name}
				  key={`medicine-card-${index}`}
                />
              );
            })}
        </SectionWrapper>
      </Container>}
	  { errorCode && !loading && <FullScreenContainer> <FormattedMessage {...getErrorMessage()}  /></FullScreenContainer>}
	  { loading && <FullScreenContainer/>}
    </LoadingOverlay>
  );
}

const PrescriptionDetailsPropTypes = {
  intl: any
};


PrescriptionDetails.propTypes = PrescriptionDetailsPropTypes;

export default injectIntl(PrescriptionDetails);
