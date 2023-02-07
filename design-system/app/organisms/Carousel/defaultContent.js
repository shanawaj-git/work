import React from 'react';
import Box from '@mui/material/Box';
const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];
export default function Slider(activeStep) {
  const content = images.map((step, index) => (
    <div key={step.label}>
      {Math.abs(activeStep - index) <= 2 ? (
        <Box
          component="img"
          sx={{
            height: 255,
            display: 'block',
            overflow: 'hidden',
            width: '100%',
          }}
          src={step.imgPath}
          alt={step.label}
        />
      ) : null}
    </div>
  ));

  return content;
}
