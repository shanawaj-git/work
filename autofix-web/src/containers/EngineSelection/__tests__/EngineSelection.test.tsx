import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EngineSelection, { pageName } from "..";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import { useRouter } from "next/router";
import * as mockCarsQueryResponse from "./CarsQueryResponse.json";
import client from "@/apollo/index";

const asyncRenderComponent = async () => {
  let tree;
  await act(async () => {
    tree = render(withWrapper(<EngineSelection />));
  });
  return tree;
};
describe("<EngineSelection />", () => {
  const router = useRouter();
  router.isReady = true;
  router.query = { modelId: "1", yearId: "1" };
  beforeEach(() => {
    client.query.mockResolvedValue(mockCarsQueryResponse);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("it should mount", async () => {
    await asyncRenderComponent();
    const engineSelection = screen.getByTestId(pageName);
    expect(engineSelection).toBeInTheDocument();
  });

  test("it should mount and match to the snapshot", async () => {
    const tree = await asyncRenderComponent();
    expect(tree.container.innerHTML).toMatchSnapshot();
  });

  test(`it should have title 'Select your engine type'`, async () => {
    const tree = await asyncRenderComponent();
    const titleElement = tree.getByTestId("article-component-title");
    const titleElementSpan = titleElement.getElementsByTagName("span");
    expect(titleElementSpan[0].innerHTML).toBe(" Select your engine type");
  });

  test(`it should have default engineType option called I don't know`, async () => {
    const tree = await asyncRenderComponent();
    const defaultItem = tree.getByText(/I don't know/);
    expect(defaultItem).toBeInTheDocument();
  });

  test(`when engine Types query resolved 2 items, Use should see 3 options including I don't know'`, async () => {
    const tree = await asyncRenderComponent();
    const items = tree.getAllByTestId(/itemCardWithAction-/);
    const defaultItem = tree.getByText(/I don't know/);
    expect(defaultItem).toBeInTheDocument();
    expect(items.length).toBe(3);
  });

  test(`when user chooses I don't know, it should redirect to mileage-selection page with engineId -1`, async () => {
    const expectedRouterOptions = {
      pathname: "/mileage-selection",
      query: {
        modelId: "1",
        yearId: "1",
      },
    };
    const tree = await asyncRenderComponent();
    const defaultItem = tree.getByText(/I don't know/);
    fireEvent(defaultItem, new MouseEvent("click", { bubbles: true }));
    expect(router.push).toBeCalledTimes(1);
    expect(router.push).toBeCalledWith(expectedRouterOptions);
  });

  test(`when user chooses Engine Type, it should redirect to mileage-selection page`, async () => {
    const expectedRouterOptions = {
      pathname: "/mileage-selection",
      query: {
        engineId: "1",
        modelId: "1",
        yearId: "1",
      },
    };
    const tree = await asyncRenderComponent();
    const defaultItem = tree.getByText(/1.6 VVT i/);
    fireEvent(defaultItem, new MouseEvent("click", { bubbles: true }));
    expect(router.push).toBeCalledWith(expectedRouterOptions);
  });

  test("when user clicks back button, should redirect to previous route and it calls only once", async () => {
    const tree = await asyncRenderComponent();
    const button = tree.getByTestId(`${pageName}-back-button`);
    fireEvent(button, new MouseEvent("click", { bubbles: true }));
    expect(router.back).toBeCalledTimes(1);
  });

  test(`when engine Types query resolved empty, It should render only one option named 'I don't know'`, async () => {
    client.query.mockResolvedValue({
      data: {
        cars: {
          data: [],
        },
      },
    });

    const expectedRouterOptions = {
      pathname: "/mileage-selection",
      query: {
        modelId: "1",
        yearId: "",
      },
    };

    const tree = await asyncRenderComponent();
    const items = tree.getAllByTestId(/itemCardWithAction-/);
    const defaultItem = tree.getByText(/I don't know/);
    expect(defaultItem).toBeInTheDocument();
    expect(items.length).toBe(1);
    fireEvent(defaultItem, new MouseEvent("click", { bubbles: true }));
    expect(router.push).toBeCalledWith(expectedRouterOptions);
  });
});
