import { getConfigData } from "./../index";
import "@testing-library/jest-dom/extend-expect";
import { getAssets, getAssetsData, getImageUrl, getLabelData } from "..";

jest.useFakeTimers();

const ROCK = "ROCK";
const STONE = "STONE";
const ZERO = 0;
const assets = {
  localisedAssets: {
    data: [ROCK],
  },
};

const image = {
  data: {
    attributes: {
      url: STONE,
    },
  },
};

const assetsData = [
  {
    attributes: {
      fileName: "key",
      file: image,
    },
  },
];
const labelsData = [
  {
    attributes: {
      code: "key",
      value: "value",
    },
  },
];

const configData = [
  {
    attributes: {
      code: "key",
      value: "value",
    },
  },
];

jest.mock("@/apollo/index", () => {
  return {
    query: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve({
            data: new Promise((res) => res({ configs: { data: configData } })),
          });
        })
    ),
  };
});

describe("Basic Utils", () => {
  test("Deconstruct Assets", async () => {
    const _assets = getAssets(assets);
    expect(_assets[ZERO]).toBe(ROCK);
  });
  test("Deconstruct Image", async () => {
    const _image = getImageUrl(image);

    expect(_image).toBe(STONE);
  });
  test("Deconstruct Assets Array to Object", async () => {
    const { key } = getAssetsData(assetsData);

    expect(key).toBe(`${process.env.STRAPI_SERVICE}${STONE}`);
  });
  test("Deconstruct Labels Array to Object", async () => {
    const { key } = getLabelData(labelsData);
    expect(key).toBe("value");
  });

  test("Deconstruct Config Array to Object", async () => {
    const { key } = await getConfigData();
    expect(key).toBe("value");
  });
});
