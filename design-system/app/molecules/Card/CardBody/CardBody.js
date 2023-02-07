import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidV4 } from 'uuid';
import { TextWithIcon } from 'molecules/TextWithIcon/TextWithIcon';

export const CardBody = props => {
  const { details } = props;
  return (
    <>
      {details.map(detail => (
        <TextWithIcon
          key={uuidV4()}
          icon={detail.icon}
          text={detail.text}
          sideText={detail.sideText}
        />
      ))}
    </>
  );
};

CardBody.propTypes = {
  details: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
      sideText: PropTypes.string,
    }),
  ),
};
