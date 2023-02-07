import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { AVAILABLE_SIZES } from './functions';
import { StyledTab, StyledTabs } from './styledComponents';

export const onChange = (setSelectedTab, onChangeCallback) => (e, value) => {
  e.preventDefault();
  setSelectedTab(value);

  if (onChangeCallback) {
    onChangeCallback(value);
  }
};

const Tabs = props => {
  const { preSelectedTab, tabs, onChangeCallback } = props;
  const initialSelectedTab = preSelectedTab || get(tabs, '[0].value');

  const [selectedTab, setSelectedTab] = useState(initialSelectedTab || 0);

  useEffect(() => {
    if (preSelectedTab) {
      setSelectedTab(preSelectedTab);
    }
  }, [preSelectedTab]);

  const renderTabs = () =>
    props.tabs.map((tab, index) => {
      const value = tab.value || index;
      const key = tab.id || `${props.id}-tab-${index}`;

      return (
        <StyledTab
          id={key}
          key={key}
          value={value}
          label={tab.label}
          size={props.size}
          data-testid={value}
          isActive={`${selectedTab === value}`}
        />
      );
    });

  const { id, ...rest } = props;

  return (
    <StyledTabs
      id={id}
      key={id}
      value={selectedTab}
      {...rest}
      onChange={onChange(setSelectedTab, onChangeCallback)}
    >
      {renderTabs()}
    </StyledTabs>
  );
};

Tabs.propTypes = {
  id: PropTypes.string,
  underline: PropTypes.bool,
  onChangeCallback: PropTypes.func,
  size: PropTypes.oneOf(AVAILABLE_SIZES),
  tabs: PropTypes.arrayOf(PropTypes.object),
  scrollButtons: PropTypes.oneOf(['auto', 'on', 'off']),
  variant: PropTypes.oneOf(['standard', 'scrollable', 'fullWidth']),
  preSelectedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Tabs.defaultProps = {
  tabs: [],
  size: 'default',
  underline: false,
  variant: 'standard',
  scrollButtons: 'auto',
  preSelectedTab: null,
  onChangeCallback: null,
  id: `tabs-${Date.now()}`,
};

export default Tabs;
