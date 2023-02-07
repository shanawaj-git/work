import React, { useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WorkshopSelection, { pageName } from "../index";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import * as Map from "@/services/map";
import * as designSystem from "@albathanext/design-system";
import * as Utils from "@/utils/index";
import * as containerUtils from "../utils";
import { autoFixClient } from "@/apollo/index";
import { ZOOM_LEVELS } from "../constants";

const workshops = [
  {
    __typename: "WorkshopResource",
    id: "eda51a30-cf21-4865-97b9-36bcc32f2850",
    name: "Tanya Jast",
    rating: 2.4,
    address: {
      __typename: "Address",
      location: {
        __typename: "Geolocation",
        coordinates: [54.48576885812361, 24.70185728066236],
      },
    },
  },
  {
    __typename: "WorkshopResource",
    id: "ca7853b7-61b1-4091-a90a-fb6c3923e928",
    name: "Silvia Abernathy",
    rating: 4.5,
    address: {
      __typename: "Address",
      location: {
        __typename: "Geolocation",
        coordinates: [54.63820837706659, 24.5548710433063],
      },
    },
  },
  {
    __typename: "WorkshopResource",
    id: "28e3e091-61c8-48ce-b42c-575487431f54",
    name: "Rufus Jenkins",
    rating: 4.2,
    address: {
      __typename: "Address",
      location: {
        __typename: "Geolocation",
        coordinates: [54.57471993370657, 24.479657108116715],
      },
    },
  },
  {
    __typename: "WorkshopResource",
    id: "be7d2e8a-24fa-4dbd-a02b-49f1819b87a8",
    name: "Chad Bashirian",
    rating: 2.6,
    address: {
      __typename: "Address",
      location: {
        __typename: "Geolocation",
        coordinates: [54.5854845372338, 24.851858669019506],
      },
    },
  },
];

/**
 * Criteria :
 * Component should render
 * Component should contain map component
 * Component should contain input
 * On Input change, Should trigger API
 * Map Bound Change, Should trigger API
 *
 */

jest.mock("@/apollo/index", () => ({
  autoFixClient: {
    query: jest.fn().mockImplementation(() => ({
      data: {
        fetchWorkshops: [],
      },
    })),
  },
}));

jest.mock("@albathanext/design-system");
const mapInstance = {
  id: 10,
  mapWindowRef: {
    LatLng: jest.fn(),
    Point: jest.fn(),
  },
  map: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    getCenter: jest.fn(),
    getZoom: jest.fn(),
    panTo: jest.fn(),
    getBounds: jest.fn().mockReturnValue({
      getNorthEast: jest.fn().mockReturnValue({
        lat: jest.fn().mockReturnValue(20.222),
        lng: jest.fn().mockReturnValue(20.222),
      }),
      getSouthWest: jest.fn().mockReturnValue({
        lat: jest.fn().mockReturnValue(20.222),
        lng: jest.fn().mockReturnValue(20.222),
      }),
    }),
  },
};
jest.mock("react-dom/server", () => ({
  renderToString: jest.fn(),
}));

jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  const mUseRef = () => ({ current: mapInstance });
  return {
    ...originReact,
    useRef: mUseRef,
    useState: jest.fn().mockImplementation((e) => [e, jest.fn()]),
    useEffect: jest.fn().mockImplementationOnce((e) => e()),
  };
});

jest.mock("lodash", () => ({
  debounce: (func: Function) => (e: unknown) => func(e),
}));

const mapMockFN = jest.fn();

jest.mock("@albathanext/design-system", () => ({
  ...jest.requireActual("@albathanext/design-system"),
  useScript: jest.fn().mockReturnValue(true),
  Map: jest.fn().mockImplementation(({ onCenterChange, ...e }) => {
    mapMockFN(e);
    onCenterChange();
    return <div data-testid="map">{e.children}</div>;
  }),
  Marker: jest.fn().mockImplementation((e) => {
    return <div data-testid={"marker"}></div>;
  }),
}));

const autocompleteMulti = jest.fn();
const detailsMulti = jest.fn();

global.woosmap = {
  multisearch: jest.fn().mockReturnValue({
    autocompleteMulti,
    detailsMulti,
  }),
};

describe("<WorkshopSelection />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Component should render", () => {
    const { container, getByTestId } = render(
      withWrapper(<WorkshopSelection />)
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(getByTestId("workshop.selection")).toBeTruthy();
    jest.restoreAllMocks();
  });

  /**
   * Should Render Map
   * OnBound Change Event Execute the side effects
   */
  test("Component should contain map component", async () => {
    useState.mockImplementation((e) => [e, jest.fn()]);
    const mockLatLng = { latitude: 12313.2123213, longitude: 12313.1 };
    const fn = jest.fn().mockImplementation(async (e) => {
      return mockLatLng;
    });
    jest.spyOn(Utils, "getCurrentLocation").mockImplementation(fn);
    autoFixClient.query.mockReturnValue({
      data: {
        fetchWorkshops: workshops,
      },
    });

    const spy = jest.spyOn(containerUtils, "getBoundLocation");
    jest.spyOn(React, "useEffect").mockImplementationOnce((e) => {
      e();
    });
    jest.spyOn(React, "useEffect").mockImplementationOnce((e) => {
      e();
    });

    render(withWrapper(<WorkshopSelection />));
    expect(mapMockFN).toBeCalled();

    const { rerender, container } = render(withWrapper(<WorkshopSelection />));
    expect(container.innerHTML).toMatchSnapshot();
    act(() => {
      rerender(withWrapper(<WorkshopSelection />));
    });

    await waitFor(
      () => {
        expect(spy).toBeCalled();
      },
      { timeout: 3000 }
    );
    expect(mapInstance.map.panTo).toBeCalled();
  });

  /**
   * Should Render Input
   * Should Inject Script
   * OnChange Event Should Call API
   */
  test("Component should contain input", async () => {
    const processAutoComplete = jest.fn().mockReturnValue([
      {
        id: "option1",
        label: "option 1",
      },
    ]);
    jest
      .spyOn(Map, "processAutoComplete")
      .mockImplementation(processAutoComplete);
    jest.spyOn(Map, "getPlacesByName").mockImplementation(jest.fn());

    const script = designSystem.useScript;

    const { getByPlaceholderText } = render(withWrapper(<WorkshopSelection />));
    const input = getByPlaceholderText("Search for an address or workshop");
    expect(input).toBeTruthy();

    expect(script).toBeCalled();
  });

  test("Component Should render markers when state update", () => {
    const state = workshops.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    useState.mockImplementationOnce(() => [state, jest.fn()]);
    useState.mockImplementation((e) => [e, jest.fn()]);
    const { container, getAllByTestId } = render(
      withWrapper(<WorkshopSelection />)
    );

    expect(getAllByTestId("marker").length).toBeGreaterThan(2);
    expect(container.innerHTML).toMatchSnapshot();
  });

  test("Should call getCurrentLocation on Mount and execute panTo", async () => {
    const mockLatLng = { latitude: 12313.2123213, longitude: 12313.1 };
    const fn = jest.fn().mockImplementation(async (e) => {
      return mockLatLng;
    });
    jest.spyOn(Utils, "getCurrentLocation").mockImplementation(fn);
    jest.spyOn(React, "useEffect").mockImplementationOnce((e) => {
      e();
    });
    jest.spyOn(React, "useEffect").mockImplementationOnce((e) => {
      e();
    });
    render(withWrapper(<WorkshopSelection />));
    await waitFor(() => {
      expect(fn).toBeCalled();
      expect(mapInstance.map.panTo).toHaveBeenCalled();
    });
  });

  test("it should ask for location access on mount and failed", () => {
    const fn = async () => {
      throw new Error("Error");
    };
    jest.spyOn(Utils, "getCurrentLocation").mockImplementation(fn);
    jest.spyOn(React, "useEffect").mockImplementationOnce((cb) => cb());
    render(withWrapper(<WorkshopSelection />));
    waitFor(() => {
      expect(mapInstance.map.panTo).not.toHaveBeenCalled();
    });
  });

  test("it should mount", () => {
    render(withWrapper(<WorkshopSelection />));
    const workshopSelection = screen.getByTestId(pageName);
    expect(workshopSelection).toBeInTheDocument();
  });

  test("it should hide all workshops when zoom level is equal or bigger than hide all level", () => {
    jest
      .spyOn(mapInstance.map, "getZoom")
      .mockImplementation(() => ZOOM_LEVELS.levelToHideAll);

    render(withWrapper(<WorkshopSelection />));
    waitFor(() => {
      expect(mapInstance.map.getZoom).toHaveBeenCalled();
    });

    expect(autoFixClient.query).not.toHaveBeenCalled();
  });

  test("it should hide all workshops when zoom level is equal or bigger than show all level", () => {
    jest
      .spyOn(mapInstance.map, "getZoom")
      .mockImplementation(() => ZOOM_LEVELS.levelToDisplayAll);

    render(withWrapper(<WorkshopSelection />));
    waitFor(() => {
      expect(mapInstance.map.getZoom).toHaveBeenCalled();
    });

    expect(autoFixClient.query.mock.calls[0][0].variables.payload.limit).toBe(
      0
    );
  });

  test("it should fetch all workshops when zoom level is above hide all level and bellow show all level", () => {
    jest.spyOn(mapInstance.map, "getZoom").mockImplementation(() => 9);

    render(withWrapper(<WorkshopSelection />));
    waitFor(() => {
      expect(mapInstance.map.getZoom).toHaveBeenCalled();
    });

    expect(autoFixClient.query.mock.calls[0][0].variables.payload.limit).toBe(
      Math.floor(9 * 1.5)
    );
  });

  test("Should call Map component with the right properties", async () => {
    const mapProperties = {
      ref: mapInstance,
      initalCordinates: [25.19741055892981, 55.27478409367688],
      googleMapKey: "AIzaSyBn3kw1bNdgmiXAczwr2DcKLAaW-M3nX14",
      woosMapKey: "woos-48c80350-88aa-333e-835a-07f4b658a9a4",
    };

    const { getByTestId } = render(withWrapper(<WorkshopSelection />));

    await waitFor(() => {
      expect(getByTestId(pageName)).not.toBeNull();
    });

    const MapComponent = jest.fn().mockImplementation((e: unknown) => e);
    jest.spyOn(designSystem, "Map").mockImplementation(MapComponent);

    expect(mapMockFN).toHaveBeenCalled();
    const mapComponentParameters = mapMockFN.mock.calls[0][0];

    expect(mapComponentParameters.initalCordinates).toStrictEqual(
      mapProperties.initalCordinates
    );
    expect(mapComponentParameters.googleMapKey).toStrictEqual(
      mapProperties.googleMapKey
    );
    expect(mapComponentParameters.woosMapKey).toStrictEqual(
      mapProperties.woosMapKey
    );
  });
});
