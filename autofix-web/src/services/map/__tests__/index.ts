import "@testing-library/jest-dom/extend-expect";
import {
  autocompleteMultiResponse,
  windowMultiSearch,
} from "src/Types/woosmap";
import {
  getPlacesByName,
  getWoosMap,
  initMultiSearchAPI,
  processAutoComplete,
} from "..";

// Mocking global

(global as unknown as windowMultiSearch).woosmap = {
  multisearch: jest.fn().mockReturnValue({
    autocompleteMulti: jest.fn(),
    detailsMulti: jest.fn(),
  }),
};

describe("Testing Map Service", () => {
  test("it should match snapshot", async () => {
    const matchReturnValue = initMultiSearchAPI();
    expect(matchReturnValue.autocompleteMulti).toBeTruthy();
    expect(matchReturnValue.detailsMulti).toBeTruthy();
  });
  test("it should return multiSearch", async () => {
    const matchReturnValue = getWoosMap();
    expect(matchReturnValue.multisearch).toBeTruthy();
  });
  test("Matching execution output with expectation for function name processAutoComplete", async () => {
    const mockData = [
      {
        id: "id",
        api: "places",
        item: {
          terms: [{ value: "terms" }],
          description: "description",
        },
      },
    ];
    const matchReturnValue = processAutoComplete(
      mockData as autocompleteMultiResponse[]
    );
    expect(matchReturnValue).toStrictEqual([
      {
        addressComponents: ["terms"],
        label: "description",
        id: "id",
        api: "places",
      },
    ]);
  });

  test("it should execute function named getPlacesByName", async () => {
    const { autocompleteMulti } = getWoosMap().multisearch({});
    getPlacesByName(autocompleteMulti, "one central");
    expect(autocompleteMulti).toBeCalled();
  });
  test("it should execute function named getPlaceDetails", async () => {
    const { detailsMulti } = getWoosMap().multisearch({});
    getPlacesByName(detailsMulti, "one central");
    expect(detailsMulti).toBeCalled();
  });
});
