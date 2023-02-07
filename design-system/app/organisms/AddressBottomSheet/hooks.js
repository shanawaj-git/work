import { useCallback } from 'react';
import { debounce } from 'utils/utils';

export const useOnInputChange = ({
  setSearchResult,
  processSearchResult,
  woosMapMultiSearch,
}) =>
  useCallback(
    e => {
      e.preventDefault();
      debounce(async event => {
        const { value } = event.target;
        if (value === '') {
          setSearchResult([]);
        }

        // If the value is not empty then search the result
        if (value.length > 0) {
          const results = await woosMapMultiSearch?.autocompleteMulti(value);

          setSearchResult(processSearchResult(results));
        }

        return null;
      }, 500)(e);
    },
    [setSearchResult, processSearchResult, woosMapMultiSearch],
  );
