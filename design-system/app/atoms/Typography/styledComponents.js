import { styled } from '@mui/material/styles';

import { Typography as TypographyMaterialUi } from '@mui/material';
import { colorSelector } from 'themes';

export const StyledTypography = styled(TypographyMaterialUi)(() => ({
  '&.MuiTypography-root': {
    color: colorSelector('fontPrimary'),
    fontFamily: 'Poppins',
  },
  '&.MuiTypography-h1': {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '34px',
    lineHeight: '41px',
    letterSpacing: '0.374px',
  },

  '&.MuiTypography-h2': {
    fontWeight: 'normal',
    fontSize: '28px',
    lineHeight: '34px',
  },

  '&.MuiTypography-h3': {
    fontWeight: 'normal',
    fontSize: '22px',
    lineHeight: '28px',
  },

  '&.MuiTypography-h4': {
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '24px',
  },

  '&.MuiTypography-h5': {
    fontWeight: '600',
    fontSize: '17px',
    lineHeight: '22px',
  },

  '&.MuiTypography-h6': {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '21px',
  },

  '&.MuiTypography-caption': {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '16px',
  },
}));
