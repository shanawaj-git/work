import { act, renderHook } from '@testing-library/react-hooks';
import { wait } from 'react-testing-library';
import { useOnInputChange } from '../hooks';

describe('hooks', () => {
  describe('useOnInputChange', () => {
    const setSearchResult = jest.fn();
    const processSearchResult = jest.fn();
    const woosMapMultiSearch = {
      autocompleteMulti: jest.fn(),
    };
    const event = {
      preventDefault: jest.fn(),

      target: {
        value: '',
      },
    };

    it('should not call woosMapMultiSearch api if the input is empty string', async () => {
      jest.mock('utils/utils', () => ({
        debounce: fn => fn(),
      }));
      const { result } = renderHook(() =>
        useOnInputChange({
          setSearchResult,
          processSearchResult,
          woosMapMultiSearch,
        }),
      );

      act(() => result.current(event));

      await wait(() => {
        expect(woosMapMultiSearch.autocompleteMulti).not.toBeCalled();
        expect(setSearchResult).toBeCalled();
        expect(event.preventDefault).toBeCalled();
      });
    });

    it('should call woosMapMultiSearch api if the input is empty string', async () => {
      event.target.value = 'one central';

      const { result } = renderHook(() =>
        useOnInputChange({
          setSearchResult,
          processSearchResult,
          woosMapMultiSearch,
        }),
      );

      act(() => result.current(event));
      await wait(() => {
        expect(woosMapMultiSearch.autocompleteMulti).toBeCalled();
        expect(setSearchResult).toBeCalled();
        expect(event.preventDefault).toBeCalled();
      });
    });
  });
});
