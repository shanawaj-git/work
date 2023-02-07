import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from 'atoms/Typography/Typography';
import { getCityAndCountry } from 'utils/utils';

export const AddressComponentHeader = ({ selectedAddress }) => {
  const [address, setAddress] = useState();
  useEffect(() => {
    if (selectedAddress) {
      const { city, country } = getCityAndCountry(
        selectedAddress?.address_components,
      );
      setAddress({ city, country });
    }
  }, [selectedAddress]);

  return (
    <div className="flex text-left">
      <div className="flex flex-col">
        <Typography typographyType="headLine">
          {selectedAddress.name || selectedAddress.formatted_address}
        </Typography>
        <Typography typographyType="callOut">
          {address?.city}, {address?.country}
        </Typography>
      </div>
    </div>
  );
};

// Create proptype for ADdressComponentHeader
AddressComponentHeader.propTypes = {
  selectedAddress: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
  }),
};
