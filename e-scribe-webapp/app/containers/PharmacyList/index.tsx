import React, { useEffect, useState } from 'react';
import { Container, Wrapper } from './styledComponents';
import { Spinner } from '@albathanext/design-system';
import PharmacySelectionTabs, {
  PharmacySelectionTab,
} from './../../components/organism/PharmacySelectionTabs';

function PharmacyList() {
  // TODO: To be changed with API Integration
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  });
  return (
    <Container>
      <Wrapper>
        <PharmacySelectionTabs activeTab={PharmacySelectionTab.Delivery} />
      </Wrapper>
      <div className="styled-spinner">
        {loader ? <Spinner /> : <h1>Comming soon</h1>}
      </div>
    </Container>
  );
}

export default PharmacyList;
