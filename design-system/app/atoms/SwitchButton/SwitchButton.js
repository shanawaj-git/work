import React from 'react';
import PropTypes from 'prop-types';

import { StyledSwitchButton } from './StyledSwitchButton';

const SwitchButton = props => {
  const { onChange, checked = false, disabled = false, others } = props;
  const [toggled, setToggled] = React.useState(checked);

  const toggle = event => {
    const isChecked = event.target.checked;
    // update the UI
    setToggled(isChecked);
    // execute onChange function passed in props
    onChange(toggled);
  };
  return (
    <div>
      <StyledSwitchButton
        checked={toggled}
        disabled={disabled}
        onChange={toggle}
        {...others}
        data-testid="toggle"
      />
    </div>
  );
};

SwitchButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  others: PropTypes.object,
};

export default SwitchButton;
