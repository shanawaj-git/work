// @ts-nocheck

import "@testing-library/jest-dom/extend-expect";
import {
  flatData,
  getCommonPageContent,
  getCurrentLiveLocation,
  getCurrentLocation,
  rejectEarly,
  validateEmail,
} from "..";
import * as FucModule from "@/services/common";
import { ApolloQueryResult, NetworkStatus } from "@apollo/client";
import { webStorage } from "@/utils/storage/WebStorage";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const MOCK_LAT = 50.1109;
const MOCK_LNG = 60.1109;

const getCurrentPosition = jest.fn().mockImplementation(async (e) => {
  const position: GeolocationPosition = {
    coords: {
      latitude: MOCK_LAT,
      longitude: MOCK_LNG,
    },
  };
  return e(position);
});
const watchPosition = jest.fn().mockImplementation(async (e) => {
  const position: GeolocationPosition = {
    coords: {
      latitude: MOCK_LAT,
      longitude: MOCK_LNG,
    },
  };
  return e(position);
});

const newNavigator = {
  ...global.navigator,
  geolocation: {
    ...global.navigator.geolocation,
    getCurrentPosition,
    watchPosition,
  },
};

interface ErrorType {
  message: string;
}

describe("Utils tests", () => {
  describe("Basic Utils", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("getCurrentLocation : Should call the getCurrentPosition Function", async () => {
      jest.spyOn(window, "navigator", "get").mockReturnValue(newNavigator);
      const coord = await getCurrentLocation();
      expect(getCurrentPosition).toBeCalled();
      expect(coord).toStrictEqual({ latitude: MOCK_LAT, longitude: MOCK_LNG });
    });

    test("getCurrentLiveLocation : Should call the getCurrentPosition Function", async () => {
      jest.spyOn(window, "navigator", "get").mockReturnValue(newNavigator);
      const callBack = jest.fn();
      await getCurrentLiveLocation({ callBack });
      expect(callBack).toBeCalled();
      expect(callBack.mock.calls[0][0].coords).toStrictEqual({
        latitude: MOCK_LAT,
        longitude: MOCK_LNG,
      });
    });

    test("getCurrentLocation : Should throw if navigator doesn't exist", async () => {
      jest.spyOn(window, "navigator", "get").mockReturnValue(undefined);
      try {
        await getCurrentLocation();
      } catch (error) {
        expect((error as ErrorType).message).toBe("Navigator doesn't exist");
      }
    });

    test("getCurrentLocation : Should throw if geolocation doesn't exist", async () => {
      jest.spyOn(window, "navigator", "get").mockReturnValue({
        geolocation: undefined,
      });
      try {
        await getCurrentLocation();
      } catch (error) {
        expect((error as ErrorType).message).toBe("Geolocation doesn't exist");
      }
    });
    test("getCurrentLiveLocation : Should throw if navigator doesn't exist", async () => {
      jest.spyOn(window, "navigator", "get").mockReturnValue(undefined);
      try {
        await getCurrentLocation();
      } catch (error) {
        expect((error as ErrorType).message).toBe("Navigator doesn't exist");
      }
    });

    test("getCurrentLiveLocation : Should throw if geolocation doesn't exist", async () => {
      jest.spyOn(window, "navigator", "get").mockReturnValue({
        geolocation: undefined,
      });
      try {
        await getCurrentLocation();
      } catch (error) {
        expect((error as ErrorType).message).toBe("Geolocation doesn't exist");
      }
    });

    test("rejectEarly : Should the function take more time, do not trigger the callback", async () => {
      const callback = jest.fn();

      await rejectEarly({
        def: undefined,
        fn: async () => {
          return mockTime(callback);
        },
        timeout: 1000,
      });

      expect(callback).not.toBeCalled();
    });
    test("rejectEarly : should call callback function when the response time is less than the timeout", async () => {
      const callback = jest.fn();

      const res = await rejectEarly({
        def: undefined,
        fn: async () => {
          mockTime(callback);
          return;
        },
      });

      jest.runAllTimers();
      expect(callback).toBeCalled();
      expect(res);
    });
    test("rejectEarly : should the callback throw, return the default value", async () => {
      const exp = await rejectEarly({
        def: "Super",
        fn: async () => {
          throw new Error("Woah");
        },
        timeout: 1000,
      });

      expect(exp).toBe("Super");
    });

    test("ValidateEmail : Check if email is correct", async () => {
      const a = validateEmail("rajaosama");
      expect(a).toBeFalsy();

      const b = validateEmail("rajaosama.me@gmail.com");
      expect(b).toBeTruthy();
    });
    test("Flat Data ", async () => {
      const obj = {
        a: {
          b: "value",
          c: "key",
        },
      };

      expect(flatData(obj)).toHaveProperty("b", "value");
      expect(flatData(obj)).toHaveProperty("c", "key");
    });
    test("Should flat the data ", async () => {
      const obj = {
        a: {
          b: "value",
          c: "key",
        },
      };

      expect(flatData(obj)).toHaveProperty("b", "value");
      expect(flatData(obj)).toHaveProperty("c", "key");
    });

    interface res {
      labels: Labels;
      localisedAssets: LocalisedAssets;
    }
    interface Labels {
      data?: DataEntity[] | null;
    }
    interface DataEntity {
      attributes: Attributes;
    }
    interface Attributes {
      code: string;
      value: string;
    }
    interface LocalisedAssets {
      data?: null[] | null;
    }
    const network: NetworkStatus = 1;

    const mockReturnedValue: ApolloQueryResult<res> = {
      data: {
        labels: {
          data: [
            {
              attributes: {
                code: "home.signup.button",
                value: "Sign me up",
              },
            },
          ],
        },
        localisedAssets: {
          data: [],
        },
      },
      loading: false,
      networkStatus: network,
    };

    test("getCommonPageContent : Should fetch data", async () => {
      const spy = jest.spyOn(FucModule, "fetchCommonData");

      spy.mockReturnValue(Promise.resolve(mockReturnedValue));
      const { assets, labels } = await getCommonPageContent({
        locale: "en",
        pageName: "home",
      });

      expect(assets);
      expect(labels).toEqual({ "home.signup.button": "Sign me up" });
    });

    test("getCommonPageContent : Should return empty object if throw", async () => {
      const spy = jest.spyOn(FucModule, "fetchCommonData");
      spy.mockRejectedValue(() => {
        throw new Error();
      });
      const data = await getCommonPageContent({
        locale: "en",
        pageName: "home",
      });
      expect(data).toEqual({});
    });
  });

  describe("WebStorage tests", () => {
    const windowValue = window;
    afterEach(() => {
      global.window = windowValue;
    });

    test("should return item from localStorage when window is defined", () => {
      const storageValue = {
        user: "Ahmed",
      };
      Object.defineProperty(window, "localStorage", {
        value: storageValue,
      });

      const value = webStorage().getItem("user", "local");
      expect(value).toBe(storageValue.user);
    });
    test("should return empty string from localStorage when window is undefined", () => {
      delete global.window;

      const value = webStorage().getItem("user", "local");
      expect(value).toBe("");
    });

    test("should return true when set item to LocalStorage and window is defined", () => {
      Object.defineProperty(window.localStorage, "setItem", {
        value: () => {},
      });

      const value = webStorage().setItem("user", {}, "local");
      expect(value).toBeTruthy();
    });
    test("should return false when set item to LocalStorage and window is undefined", () => {
      delete global.window;

      const value = webStorage().setItem("user", {}, "local");
      expect(value).toBeFalsy();
    });
  });
});
const defaultTimeout = 2000;
const mockTime = (callback: () => {}, timeout?: number) => {
  setTimeout(() => {
    callback();
  }, timeout || defaultTimeout);
};
