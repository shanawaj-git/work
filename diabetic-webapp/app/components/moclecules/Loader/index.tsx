import React from 'react';
import Box from '@mui/material/Box';
import PropTypes, { InferProps } from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({ size = 95, thickness = 2 }: LoaderProps) => (
  <Box sx={{ position: 'relative', width: size, height: size }}>
    <CircularProgress
      variant="determinate"
      sx={{
        color: '#c5c5c5',
      }}
      size={size}
      thickness={thickness}
      value={100}
    />
    <svg style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="my_gradient">
          <stop offset="0%" stopColor="#00664f" />
          <stop offset="100%" stopColor="#c5c5c5" />
        </linearGradient>
      </defs>
    </svg>
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        'svg circle': { stroke: 'url(#my_gradient)' },
        position: 'absolute',
        left: 0,
      }}
      size={size}
      thickness={thickness}
    />
  </Box>
);

const LoaderPropTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
};

type LoaderProps = InferProps<typeof LoaderPropTypes>;

Loader.propTypes = LoaderPropTypes;

export default Loader;
