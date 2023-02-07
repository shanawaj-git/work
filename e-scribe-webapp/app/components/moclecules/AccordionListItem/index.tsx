import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ListItemWrapper } from './StyledComponenets';

export const AccordionListItem = ({ label, value, image }) => {
  return (
    <ListItemWrapper>
      <FormattedMessage {...label} />
      <span>
        {image && <img src={image} />} {value}
      </span>
    </ListItemWrapper>
  );
};

const AccordionListItemPropTypes = {
  label: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }).isRequired,
  value: PropTypes.string.isRequired,
  image: PropTypes.string,
};
AccordionListItem.defaultProps = {
  image: null,
};
AccordionListItem.prototype = AccordionListItemPropTypes;
