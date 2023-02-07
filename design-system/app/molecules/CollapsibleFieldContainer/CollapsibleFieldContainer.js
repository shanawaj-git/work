import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from 'atoms/Typography';
import {
  IconContainer,
  IconImage,
  HeaderContainer,
  MainContainer,
  ContentContainer,
  Divider,
} from './styledComponents';

export const CollapsibleFieldContainer = ({
  label,
  value,
  placeholder,
  icon,
  children,
  openByDefault = false,
}) => {
  const [open, setOpen] = useState(openByDefault);
  return (
    <MainContainer>
      <HeaderContainer
        data-testid="collapsible-header-container"
        onClick={() => setOpen(!open)}
      >
        <IconContainer className="collapsible-header-icon">
          <IconImage src={icon} alt={placeholder} />
        </IconContainer>
        <Typography className="collapsible-header-label">{label}</Typography>
        {value ? (
          <Typography className="collapsible-header-value text-align-right">
            {value}
          </Typography>
        ) : (
          <Typography className="collapsible-header-placeholder text-align-right">
            {placeholder}
          </Typography>
        )}
      </HeaderContainer>
      {open && (
        <ContentContainer>
          <Divider />
          {children}
        </ContentContainer>
      )}
    </MainContainer>
  );
};

// Props Type
CollapsibleFieldContainer.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.any.isRequired,
  children: PropTypes.any,
  openByDefault: PropTypes.bool,
};
