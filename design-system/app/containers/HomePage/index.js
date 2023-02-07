import React from 'react';
import PropTypes from 'prop-types';
import Button from 'atoms/Button';
import Typography from 'atoms/Typography';
import RadioButton from 'atoms/RadioButton';
import Checkbox from 'atoms/Checkbox';
import SwitchButton from 'atoms/SwitchButton';
import Input from 'molecules/Input';
import ListItem from 'molecules/ListItem/ListItem';
import PharmacyCard from 'domains/health/PharmacyCard';
import Tabs from 'organisms/Tabs';
import ImageCardWithCta from 'molecules/ImageCardWithCta';
import MedicineCard from 'domains/health/MedicineCard';
import SwipeableView from 'organisms/Carousel';
import './styles.css';
import { MapWrapper, TypographyType } from '../..';
const editIcon = require('images/edit.svg');
const tickIcon = require('images/tick.svg');
const pillIcon = require('images/pill-icon.png');
const panelIcon = require('images/location-icon.svg');
const panelButtonIcon = require('images/arow-right.svg');

const onChange = () => {};

export default function HomePage(props) {
  const { index = 0 } = props;
  const [tabIndex, setTabIndex] = React.useState(index);

  return (
    <div>
      <Tabs
        tabs={[
          { label: 'Delivery', value: 0 },
          { label: 'Click & Collect', value: 1 },
        ]}
        variant="fullWidth"
        id="test-tabs"
        onChangeCallback={setTabIndex}
      />
      <SwipeableView
        className="swiper"
        direction="ltr"
        autoplay={false}
        position="static"
        nextButton
        backButton
        variant="dots"
        maxSteps={4}
      />
      <SwipeableView
        className="swiper"
        direction="ltr"
        autoplay
        position="static"
        nextButton
        backButton
        variant="dots"
        maxSteps={4}
      />
      {tabIndex === 0 && (
        <>
          <Typography typographyType={TypographyType.LARGE_TITLE}>
            Large title
          </Typography>
          <Typography typographyType={TypographyType.TITLE_1}>
            Title #1
          </Typography>
          <Typography typographyType={TypographyType.TITLE_2}>
            Title #2
          </Typography>
          <Typography typographyType={TypographyType.TITLE_3}>
            Title #3
          </Typography>
          <Typography typographyType={TypographyType.HEAD_LINE}>
            Headline
          </Typography>
          <Typography typographyType={TypographyType.CALL_OUT}>
            Callout
          </Typography>
          <Typography typographyType={TypographyType.SUB_HEAD}>
            Subhead
          </Typography>
          <Typography typographyType={TypographyType.FOOT_NOTE}>
            Footnote
          </Typography>
          <Typography typographyType={TypographyType.CAPTION}>
            Caption
          </Typography>

          <ListItem
            leftText="Flat / Villa No."
            placeholder="Required"
            icon={editIcon}
          />

          <Button variant="contained">
            <>button</>
          </Button>

          <RadioButton
            groupLabel="Gender"
            row
            values={{ Male: 'boy', Female: 'girl' }}
            groupName="test"
            onChange={onChange}
          />
          <Checkbox
            color="primary"
            value="check"
            label="test"
            labelPlacement="end"
          />
          <SwitchButton onChange={onChange} />
        </>
      )}
      {tabIndex === 1 && (
        <>
          <Input
            name="firstName"
            label="Label"
            errorMessage="error message"
            required
            variant="standard"
            placeholder="placeholder"
            helperText="helper text"
            onChange={onChange}
          />
          <PharmacyCard
            title="Al Manara Pharmacy"
            subTitle="Al Sufouh"
            description="Open until 22:00"
            subDescription="20 min"
            subDescriptionIcon={require('images/truck.svg')}
            headerImage={require('images/almanara-pharmacy.png')}
            footerIcon={require('images/tick.svg')}
            footerText="All meds covered"
            bodyDetails={[
              {
                text: 'Hyrdoxyzine hydrochloride',
                sideText: 'AED 150.00',
                icon: tickIcon,
              },
              {
                text: 'Glimepiride-rosiglitazone',
                sideText: 'AED 150.00',
                icon: tickIcon,
              },
              {
                text: 'Novolin 70/30',
                sideText: 'AED 150.00',
                icon: tickIcon,
              },
            ]}
            bodySummary={[
              {
                text: 'Cost of Medicines',
                sideText: 'AED 550.00',
              },
              {
                text: 'Est. Insurance Coverage*',
                sideText: 'AED 500.00',
              },
            ]}
            footerDetails={{
              buttonText: 'Select pharmacy',
              titleText: 'Your est. co-payment*',
              titleSideText: 'AED 50.00',
              caption: '*Final amounts subject to insurance coverage',
            }}
          />
          {/* <Spinner /> */}
          <ListItem
            leftText="Flat / Villa No."
            placeholder="Required"
            icon={editIcon}
          />
          <ImageCardWithCta
            icon={panelIcon}
            title="We Work offices"
            subTitle="The Offices 4, Albatha Next, 8th floor..."
            buttonIcon={panelButtonIcon}
          />
          <MedicineCard
            image={pillIcon}
            title="Hydroxyzine "
            subTitle="Hydroxyzine "
            description="3 times a day, for 5 days "
            bodyText="Doctors Notes: <br> Take 3 times a day, after food."
          />

          <MapWrapper
            initalCordinates={[25.204849, 55.270782]}
            woosMapKey="woos-48c80350-88aa-333e-835a-07f4b658a9a4"
            googlePlacesKey="AIzaSyAgaUwsVVXJ6KMxlxILqyHi_-udaQke7M4"
            googleMapKey="AIzaSyBn3kw1bNdgmiXAczwr2DcKLAaW-M3nX14"
            titles={['Where would you like', 'your meds delivered to?']}
          />
        </>
      )}
      <br />
    </div>
  );
}

HomePage.propTypes = {
  index: PropTypes.number,
};
