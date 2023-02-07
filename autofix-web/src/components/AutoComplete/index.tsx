import React, { SyntheticEvent, useEffect, useState } from "react";
import { useScript } from "@albathanext/design-system";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Location,
  multiSearchType,
  processAutoCompleteType,
} from "src/Types/woosmap";
import { debounce } from "lodash";
import {
  getPlaceDetails,
  getPlacesByName,
  initMultiSearchAPI,
  MULTI_SEARCH_CDN,
  processAutoComplete,
} from "@/services/map";

interface AutoCompleteComponentType {
  inputComponent: (params?: {}) => JSX.Element;
  onAddressSelection: (location: Location) => void;
}
export const AutoCompleteComponent = ({
  inputComponent,
  onAddressSelection,
}: AutoCompleteComponentType) => {
  const [options, setOptions] = useState<processAutoCompleteType[]>([]);
  const loadMultiSearch: boolean = useScript(MULTI_SEARCH_CDN);
  const [multiSearch, setMultiSearch] = useState<multiSearchType>(
    {} as multiSearchType
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!loadMultiSearch) return;
    setMultiSearch(initMultiSearchAPI());
  }, [loadMultiSearch]);

  const onChange = debounce((e: { target: { value: string } }) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  }, 750);

  const handleSearch = async (value: string) => {
    const results = await getPlacesByName(
      multiSearch?.autocompleteMulti,
      value
    );
    const data = processAutoComplete(results);
    setOptions(data);
  };

  const inputProps = {
    value: searchText,
    onChange,
  };

  const onChangeHandler = async (
    _: SyntheticEvent<Element, Event>,
    newValue: processAutoCompleteType | null
  ) => {
    if (newValue) {
      const { geometry } = await getPlaceDetails(
        multiSearch.detailsMulti,
        newValue
      );
      onAddressSelection(geometry.location);
    }
  };

  return (
    <Autocomplete
      data-testid="AutoComplete"
      inputMode="search"
      disablePortal
      id="workshop-selection-autocomplete"
      options={options}
      onChange={onChangeHandler}
      renderInput={(param) => inputComponent({ ...param, ...inputProps })}
    />
  );
};
