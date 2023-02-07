import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { TypographyType, Tabs as TabsComponent } from '@albathanext/design-system';
import { useParams, useLocation, useHistory } from "react-router-dom";

import { Container, ScreenTitle } from './styledComponents';
import messages from './messages';

export enum  PharmacySelectionTab {
  Delivery = 'delivery',
  ClickAndCollect = 'clickncollect'
};

export const PARAM_KEY_PREVIOUS_LOCATION_DATA = 'pharmacySelectionPreviousLocation'

export const DefaultPages = {
  [PharmacySelectionTab.Delivery]: '/delivery/address-selection',
  [PharmacySelectionTab.ClickAndCollect]: '/click-n-collect'
};

function PharmacySelectionTabs({ intl, activeTab }: PharmacySelectionTabsTypes) {
  const { prescriptionNumber } = useParams();
  const currentLocationData = useLocation();
  const currentPath = currentLocationData.pathname;
  // only two tabs, hence storing in a variable
  // for more than two tabs it needs to be in a map
  const previousTabLocationData = currentLocationData.state?.[PARAM_KEY_PREVIOUS_LOCATION_DATA];
  const basePath = `${currentPath.substr(0, currentPath.indexOf(prescriptionNumber))}${prescriptionNumber}`; 
  const history = useHistory();
  
  const onTabSwitch = (newTab: PharmacySelectionTab) => {
    //checking if it came from a previous tab
    const targetLocation = previousTabLocationData ? {
      // navigate to previous tab
      ...previousTabLocationData,
    } : {
      // else navigate to default page for the tab
      pathname: `${basePath}${DefaultPages[newTab]}`,
    };

    const newPreviousTabLocationData = { ...currentLocationData };
    // we do not need previous location data again in the previous location data object
    if(newPreviousTabLocationData.state?.[PARAM_KEY_PREVIOUS_LOCATION_DATA]) {
      delete newPreviousTabLocationData.state[PARAM_KEY_PREVIOUS_LOCATION_DATA];
    }

    targetLocation.state = {
      ...targetLocation.state,
      [PARAM_KEY_PREVIOUS_LOCATION_DATA]: newPreviousTabLocationData,
    };
    
    history.push(targetLocation);
  }

  return (
    <Container>
      <ScreenTitle typographyType={TypographyType.TITLE_1}>
        {intl.formatMessage(messages.screenTitle)}
      </ScreenTitle>
      <TabsComponent
        id="pharmacy-selection-tabs"
        className="tabs"
        onChangeCallback={onTabSwitch}
        tabs={[
          {
            label: intl.formatMessage(messages.deliveryTabLabel),
            value: PharmacySelectionTab.Delivery,
          },
          {
            label: intl.formatMessage(messages.clickNCollectTabLabel),
            value: PharmacySelectionTab.ClickAndCollect,
          },
        ]}
        preSelectedTab={activeTab}
        variant="fullWidth"
      />
    </Container>
  );
}

const PharmacySelectionTabsPropTypes = {
  intl: intlShape,
  activeTab: PropTypes.oneOf(
    Object.values(PharmacySelectionTab) as PharmacySelectionTab[]
  ),
};

type PharmacySelectionTabsTypes = InferProps<
  typeof PharmacySelectionTabsPropTypes
>;
PharmacySelectionTabs.defaultProps = {};
PharmacySelectionTabs.propTypes = PharmacySelectionTabsPropTypes;

export default injectIntl(PharmacySelectionTabs);
