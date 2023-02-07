import styled from 'styled-components';
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from '@mui/material';
import { styled as MuiStyled } from '@mui/material/styles';
import CardFooter from 'molecules/Card/CardFooter';
import CardHeader from 'molecules/Card/CardHeader';
import { colorSelector } from 'themes';

import { TextWithIcon } from 'molecules/TextWithIcon/TextWithIcon';

export const StyledCardHeader = styled(props => <CardHeader {...props} />)(
  () => ({
    '.card-header-wrapper': {
      display: 'flex',
      flexDirection: 'column',

      '> div': {
        display: 'flex',
      },

      '.card-header-footer': {
        marginTop: '20px',
        display: 'block',
        '.MuiTypography-caption': {
          fontSize: '16px',
          color: colorSelector('c100'),
          fontWeight: 600,
        },
      },
    },

    '.card-header-image': {
      display: 'flex',
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      justifyContent: 'space-between',
      marginRight: '8px',
    },

    '.textWithIcon': {
      display: 'flex',

      img: {
        marginRight: '4px',
        height: '16px',
        width: '16px',
        marginTop: 'auto',
        marginBottom: 'auto',
      },
    },
  }),
);

export const StyledAccordion = MuiStyled(Accordion)`
&.MuiAccordion-root {
	box-shadow: none;
	margin-bottom: 0px;
	:before {
		opacity: 0;
	}
}

  .MuiAccordion-root:before {
    content: '' !important;
    opacity: 0;
  }
`;

export const StyledAccordionDetails = styled(props => (
  <AccordionDetails {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'normal',

  '&&.MuiAccordionDetails-root': {
    paddingBottom: '0px',
  },

  '.textWithIcon': {
    display: 'flex',
    justifyContent: 'center',
    height: '35px',
    img: {
      height: '16px',
      width: '16px',
      marginRight: '8px',
    },

    '.MuiTypography-caption': {
      color: colorSelector('primaryFont'),
      fontWeight: '400',
      fontSize: '13px',
    },

    '.textWithIcon-sideText': {
      marginLeft: 'auto',
    },
  },
}));

export const StyledAccordionSummary = MuiStyled(AccordionSummary)`
	.MuiAccordionSummary-content {
		display: flex;
		flex-direction: column;

		&.Mui-expanded {
			margin-bottom: 10px;
		}
	}
	.textWithIcon {
		img {
			margin-right: 8px;
		}
	}
  }
`;

export const StyledCardFooter = styled(props => <CardFooter {...props} />)(
  () => ({
    paddingLeft: '15px',
    paddingRight: '15px',
    display: 'flex',
    flexDirection: 'column',

    '.card-footer-title': {
      marginBottom: '10px',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '.MuiTypography-caption': {
        fontSize: '15px',
        fontWeight: '600',
      },

      'span:last-child': {
        color: colorSelector('c100'),
        textAlignment: 'center',
        background: colorSelector('p100'),
        borderRadius: '20px',
        padding: '10px',
      },
    },
    '.card-footer-subtitle': {
      paddingBottom: '20px',
      color: colorSelector('c100'),
    },
  }),
);

export const StyledDivider = MuiStyled(Divider)`
  margin-bottom: 10px;
  width: 97%;
  margin-left: auto;
  margin-right: auto;
`;

export const PriceSummary = styled(TextWithIcon)`
  font-size: 13px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
`;

export const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 16px;
`;
