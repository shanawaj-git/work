import React from 'react';
import PropTypes from 'prop-types';
import Input from 'molecules/Input';
import Typography from '../../atoms/Typography/Typography';
import { SearchListItem } from './SearchListItem';

export function AddressSearchComponent(props) {
  const {
    searchResult,
    onChangeHandler,
    inputRef,
    onFocus,
    onSelection,
    snapTo,
    title,
    subTitle,
    inputProps,
  } = props;

  return (
    <div data-testid="rendering-search" className="px-6 pt-7">
      <Typography typographyType="title2">
        <p data-testid="rendering-title" className="font-light">
          {title}
        </p>
        <p className="font-bold">{subTitle}</p>
      </Typography>
      <Input
        inputProps={{
          id: 'my-input-multisearch',
          'data-testid': 'search-input',
        }}
        autoComplete="on"
        role="combobox"
        input={{
          onFocus,
          name: 'search',
        }}
        initialFocusRef={inputRef}
        ref={inputRef}
        onChange={onChangeHandler}
        style={{
          width: '100%',
        }}
        {...inputProps}
      />
      <div className="h-3" />
      {searchResult?.map(result => (
        <React.Fragment key={result.placeId}>
          <SearchListItem
            onSelection={onSelection}
            snapTo={snapTo}
            result={result}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

// Proptypes
AddressSearchComponent.propTypes = {
  searchResult: PropTypes.array,
  onChangeHandler: PropTypes.func,
  inputRef: PropTypes.object,
  onFocus: PropTypes.func,
  onSelection: PropTypes.func,
  snapTo: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  inputProps: PropTypes.object,
};
