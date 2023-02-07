import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { BottomSheet } from 'react-spring-bottom-sheet';
import Button from 'atoms/Button';
import useScript from 'utils/hook/useScript';
import PropTypes from 'prop-types';
import 'react-spring-bottom-sheet/dist/style.css';
import { AddressFormComponent } from './AddressFormComponent';
import { AddressComponentHeader } from './AddressComponentHeader';
import { AddressSearchComponent } from './AddressSearchComponent';
import { useOnInputChange } from './hooks';

const MULTI_SEARCH_CDN =
  'https://sdk.woosmap.com/multisearch/multisearch.js?version=6';
const UAE_COUNTRY_CODE = 'AE';

const SEARCH_SECTION = 'search-section';
const FORM_SECTION = 'form-section';
const SEARCH_TEXT = 'Search ...';

/**
 * React MultiSearch Component with Woos-map MltiSearch
 */

export const AddressBottomSheetComponent = React.forwardRef(
  (
    {
      woosMapKey,
      googlePlacesKey,
      onSelection,
      title,
      subTitle,
      mapDragAddress,
      loading,
      onInputsChange,
      onCancel,
      onConfirmLocation,
    },
    ref,
  ) => {
    if (!googlePlacesKey) throw new Error('Google Places ID is Required');
    if (!woosMapKey) throw new Error('Woos Map ID is Required');
    const multisearch = useScript(MULTI_SEARCH_CDN);
    const [woosMapMultiSearch, setwoosMapMultiSearch] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [activeComponent, setActiveComponent] = useState(SEARCH_SECTION);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [form, setForm] = useState();
    const [isConfirmedEnabled, setisConfirmedEnabled] = useState(false);

    const components = {
      country: [UAE_COUNTRY_CODE],
    };

    /**
     * Sending From Change Event Back To Parent
     */
    useEffect(() => {
      if (onInputsChange) onInputsChange(form);
    }, [form]);

    const processSearchResult = searchResults =>
      extractAddressComponentNames(searchResults);

    /**
     * Map the search result to the required format
     * @param {*} searchResults
     * @returns
     */
    const extractAddressComponentNames = searchResults =>
      searchResults.map(searchResultItem => {
        const { id, api } = searchResultItem;
        const { terms = [], description } = searchResultItem?.item;
        return {
          addressComponents: terms.map(term => term.value),
          formatedAddress: description,
          placeId: id,
          api,
        };
      });

    useEffect(() => {
      if (!multisearch) return;
      // Initialize the WoosMap MultiSearch and set the state
      setwoosMapMultiSearch(
        window.woosmap?.multisearch({
          apiOrder: ['places', 'localities', 'address'],
          components,
          localities: {
            key: woosMapKey,
            params: {
              language: 'en',
              components,
            },
          },
          address: {
            key: woosMapKey,
            params: {
              language: 'en',
              components,
            },
          },
          places: {
            params: {
              language: 'en',
              components,
            },
            key: googlePlacesKey,
          },
        }),
      );
    }, [multisearch]);

    /**
     * On Input Change Handler, debounce the search
     */
    const onChangeHandler = useOnInputChange({
      setSearchResult,
      processSearchResult,
      woosMapMultiSearch,
    });

    // Search Input Ref
    const inputRef = useRef(null);

    // Focus the search input
    const onFocus = () =>
      ref.current.snapTo(({ snapPoints }) => snapPoints[snapPoints.length - 1]);

    /**
     * OnSelection Of an Address from the search result
     * @param {*} payload : Place id and api type
     */
    const onAddressSelection = async payload => {
      const res = await getPlaceDetail(payload);
      ref.current.snapTo(({ snapPoints }) => snapPoints[1]);
      setSelectedAddress(res);
      setActiveComponent(FORM_SECTION);
      onSelection(res.geometry.location);
    };

    /**
     * Get Places Detail From MultiSearch
     * @param {*} param0
     * @returns
     */
    const getPlaceDetail = async ({ ...placesId }) => {
      const res = await woosMapMultiSearch?.detailsMulti(placesId);
      return res;
    };

    /**
     * OnBack of the form component
     */
    const onBack = () => {
      if (onCancel) onCancel();
      setActiveComponent(SEARCH_SECTION);
      setSelectedAddress(undefined);
    };

    /**
     * On Receive Of an Address by the dragging of the map from parent Component
     * */
    useEffect(() => {
      if (mapDragAddress) {
        setSelectedAddress(mapDragAddress);
        setActiveComponent(FORM_SECTION);
        ref.current.snapTo(({ snapPoints }) => snapPoints[1]);
      }
    }, [mapDragAddress]);

    const isFormActive = activeComponent !== SEARCH_SECTION;
    if (loading)
      return (
        <BottomSheet
          blocking={false}
          snapPoints={({ maxHeight }) => [maxHeight * 0.25]}
          open
        >
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        </BottomSheet>
      );

    /**
     * Handles The Form Input States.
     * @param {*} states
     */
    const handleFormState = states => {
      const listOfRequiredInputs = Object.values(formFields).reduce(
        (acc, curr) => {
          if (curr.required) {
            acc.push(curr.name);
          }
          return acc;
        },
        [],
      );

      const isConfirmEnabled = listOfRequiredInputs.reduce(
        (acc, curr) => {
          if (!states[curr]) {
            acc.enabled = false;
            return acc;
          }
          acc.enabled = true;
          return acc;
        },
        { enabled: true },
      );

      setisConfirmedEnabled(isConfirmEnabled.enabled);
      setForm(states);
    };

    const handleConfirm = () => {
      onConfirmLocation({ form, addressFetched: selectedAddress });
    };

    return (
      <BottomSheet
        ref={ref}
        blocking={false}
        snapPoints={({ maxHeight }) => [
          maxHeight * 0.25,
          maxHeight * 0.5,
          maxHeight * 0.9,
        ]}
        open
        footer={
          isFormActive && (
            <Footer
              cancelText="Cancel"
              confirmText="Confim Location"
              onConfirmLocation={handleConfirm}
              disabledConfirmButton={!isConfirmedEnabled}
              onCancel={onBack}
            />
          )
        }
        header={
          isFormActive ? (
            <AddressComponentHeader selectedAddress={selectedAddress} />
          ) : null
        }
      >
        {activeComponent === SEARCH_SECTION && (
          <AddressSearchComponent
            searchResult={searchResult}
            onChangeHandler={onChangeHandler}
            inputRef={inputRef}
            onFocus={onFocus}
            onSelection={onAddressSelection}
            snapTo={ref?.current?.snapTo}
            title={title}
            subTitle={subTitle}
            inputProps={{
              placeholder: SEARCH_TEXT,
            }}
          />
        )}

        {activeComponent === FORM_SECTION && (
          <AddressFormComponent
            formFields={formFields}
            formState={handleFormState}
            selectedAddress={selectedAddress}
          />
        )}
      </BottomSheet>
    );
  },
);

const Footer = ({
  onCancel,
  onConfirmLocation,
  cancelText,
  confirmText,
  disabledConfirmButton,
}) => (
  <div className="flex justify-between">
    <Button data-testid="render-cancel" onClick={onCancel}>
      <>{cancelText}</>
    </Button>
    <Button
      data-testid="render-confirm"
      onClick={onConfirmLocation}
      variant="contained"
      disabled={disabledConfirmButton}
    >
      <>{confirmText}</>
    </Button>
  </div>
);

// Proptype
Footer.propTypes = {
  onCancel: PropTypes.func,
  onConfirmLocation: PropTypes.func,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  disabledConfirmButton: PropTypes.bool,
};

AddressSearchComponent.propTypes = {
  woosMapMultiSearch: PropTypes.object,
  searchResult: PropTypes.array,
  locationIcon: PropTypes.string,
  onChangeHandler: PropTypes.func,
  inputRef: PropTypes.object,
  onFocus: PropTypes.func,
  onSelection: PropTypes.func,
  snapTo: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

AddressBottomSheetComponent.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  woosMapKey: PropTypes.string.isRequired,
  googlePlacesKey: PropTypes.string.isRequired,
  onSelection: PropTypes.func,
  mapDragAddress: PropTypes.object,
  loading: PropTypes.bool,
  onInputsChange: PropTypes.func,
  onConfirmLocation: PropTypes.func,
  onCancel: PropTypes.func,
};

export const formFields = {
  address: {
    label: 'Pickup Address',
    type: 'text',
    name: 'address',
    required: true,
    editable: false,
  },
  flatvillano: {
    label: 'Flat/Villa No.',
    type: 'text',
    name: 'flatvillano',
    required: true,
    placeholder: 'Required',
    editable: true,
    errorMessage: 'Please enter Flat/Villa No.',
  },
  flatvillaname: {
    label: 'Flat/Villa Name',
    type: 'text',
    name: 'flatvillaname',
    required: true,
    placeholder: 'Required',
    editable: true,
    errorMessage: 'Please enter Flat/Villa Name',
  },
  direction: {
    label: 'Directions',
    placeholder: 'Optional',
    type: 'text',
    name: 'direction',
    required: false,
    editable: true,
  },
};
