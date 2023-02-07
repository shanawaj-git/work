import React from 'react';
import PropTypes from 'prop-types';
import ImageCardWithCta from 'molecules/ImageCardWithCta';

export function SearchListItem({ onSelection, snapTo, result }) {
  const locationIcon = require('../../images/location-icon.svg');

  const onClickHandler = () => {
    snapTo(({ snapPoints }) => snapPoints[0]);
    onSelection({
      id: result.placeId,
      api: result.api,
    });
  };
  return (
    <div
      data-testid="rendering-searchList"
      onClick={onClickHandler}
      aria-hidden="true"
    >
      <ImageCardWithCta
        onClick={() => {}}
        cardIcon={locationIcon}
        subTitle={result.addressComponents[1]}
        title={result.addressComponents[0] || result.formatedAddress}
      />
      <br />
    </div>
  );
}

// Proptypes
SearchListItem.propTypes = {
  onSelection: PropTypes.func,
  snapTo: PropTypes.func,
  result: PropTypes.object,
};
