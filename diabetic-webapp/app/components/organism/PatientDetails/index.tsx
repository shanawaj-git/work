import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography, TypographyType } from '@albathanext/design-system';
import { colorSelector } from 'themes';
import PropTypes, {InferProps} from 'prop-types';

import { AccordionListItem } from 'components/moclecules/AccordionListItem';

import {
  Container,
  StyledAccordionSummary,
  StyledAccordion,
  StyledAccordionDetails,
  StyledSpan,
  Title,
} from './styledComponents';

import messages from './messages';
import { Prescription } from 'features/prescription/api/graphql';

const expandIcon = require('images/expand-icon.svg');
const tickIcon = require('images/tick-icon.svg');
function PatientDetails({ prescription }: PatientDetailsType) {
  const {
    patient,
    doctor,
    insurance,
    pin,
    visitDate,
    prescriptionNumber,
  } = prescription;
  const { provider, policyNumber, insuranceId } = insurance || {};
  const doctorName = `${doctor?.name?.first} ${doctor?.name?.last}`;
  const patientName = `${patient?.name?.first} ${patient?.name?.last}`;
  const mohId = patient?.mohId;

  return (
    <Container>
      <Typography
        color={colorSelector('p300')}
        typographyType={TypographyType.FOOT_NOTE}
      >
        <FormattedMessage {...messages.prescription} />
      </Typography>
      <Title typographyType={TypographyType.TITLE_1}>{patientName}</Title>

	  { doctorName && <StyledSpan>
		<Typography
		typographyType={TypographyType.FOOT_NOTE}
		style={{ fontWeight: '600' }}
		>
		<span><FormattedMessage {...messages.doctor} />:</span>
		</Typography>
		<Typography typographyType={TypographyType.FOOT_NOTE}>
		 <span>{` `}<FormattedMessage {...messages.doctorAppriviation} />{` ${doctorName}`}</span>
		</Typography>
		</StyledSpan>
	  }


      { provider?.name && 
	  	<StyledSpan>
			<Typography
			typographyType={TypographyType.FOOT_NOTE}
			style={{ fontWeight: '600' }}
			>
          	<span><FormattedMessage {...messages.insurance} />:</span>
        	</Typography>
        	<Typography typographyType={TypographyType.FOOT_NOTE}>
			<span>{` `}{provider.name}</span>
    	    </Typography>
	    </StyledSpan>
	  }

      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<img src={expandIcon} />}>
          <Typography
            color={colorSelector('p300')}
            typographyType={TypographyType.CALL_OUT}
          >
            <FormattedMessage {...messages.fullPrescriptionDetails} />
          </Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          { pin && <AccordionListItem label={messages.pin} value={pin} />}
          {doctorName && <AccordionListItem label={messages.doctor} value={doctorName} />}
          {policyNumber && <AccordionListItem
            label={messages.policyReference}
            value={policyNumber}
            image={tickIcon}
          />}
          { mohId && <AccordionListItem label={messages.mohId} value={mohId} />}
		  { visitDate && <AccordionListItem label={messages.visitDate} value={new Date(visitDate).toLocaleDateString("en-US")} />}

          {prescriptionNumber && <AccordionListItem
            label={messages.prescriptionNumber}
            value={prescriptionNumber}
          />}
          { insuranceId && <AccordionListItem label={messages.insuranceId} value={insuranceId} />}
          { provider?.name && <AccordionListItem
            label={messages.insuranceProvider}
            value={provider.name}
          />}
        </StyledAccordionDetails>
      </StyledAccordion>
    </Container>
  );
}

export default PatientDetails;

PatientDetails.prototype = {
	prescription: PropTypes.shape({
		prescriptionNumber: PropTypes.string.isRequired,
		visitDate: PropTypes.instanceOf(Date),
		pin: PropTypes.string,
		insurance: PropTypes.shape({
			provider: PropTypes.shape({
				name: PropTypes.string
			}), 
			policyNumber: PropTypes.string, 
			insuranceId: PropTypes.string
		}),
		patient: PropTypes.shape({
			name: PropTypes.shape({
				first: PropTypes.string,
				middle: PropTypes.string,
				last: PropTypes.string
			}).isRequired,
			mohId: PropTypes.string,
		}).isRequired,
		doctor: PropTypes.shape({
			name: PropTypes.shape({
				first: PropTypes.string,
				middle: PropTypes.string,
				last: PropTypes.string
			}).isRequired,	
		}),
	}).isRequired
}

type PatientDetailsType = InferProps<typeof PatientDetails.prototype>;