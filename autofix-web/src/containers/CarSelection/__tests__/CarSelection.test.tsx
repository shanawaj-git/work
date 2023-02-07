import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { withWrapper } from "../../../utils/IntlProviderWrapper";
import { MockedProvider } from "@apollo/client/testing";
import { MockedResponse } from "@apollo/client/testing/core";
import { GET_CAR_MAKERS_AND_MODELS } from "../../../services/gql/carMakerAndModelQueries";
import CarSelection from "../index";
import { CarMakerAndModelsQueryResponse } from "../../../Types/CarMakerAndModels";
import { useRouter } from "next/router";

describe("<CarSelection />", () => {
  const carsData: CarMakerAndModelsQueryResponse = {
    makers: {
      data: [
        {
          id: "1",
          attributes: {
            logo: "https://autofixdev.blob.core.windows.net/demo/audi-logo.svg",
            name: "Audi",
            models: {
              data: [
                {
                  id: "1",
                  attributes: {
                    image: undefined,
                    name: "A1",
                  },
                },
                {
                  id: "2",
                  attributes: {
                    image: undefined,
                    name: "A2",
                  },
                },
                {
                  id: "3",
                  attributes: {
                    image: undefined,
                    name: "A3",
                  },
                },
                {
                  id: "9",
                  attributes: {
                    image: undefined,
                    name: "A4",
                  },
                },
              ],
            },
          },
        },
        {
          id: "2",
          attributes: {
            logo: "https://autofixdev.blob.core.windows.net/demo/toyota-logo.svg",
            name: "Toyota",
            models: {
              data: [
                {
                  id: "4",
                  attributes: {
                    image: undefined,
                    name: "Corolla",
                  },
                },
                {
                  id: "5",
                  attributes: {
                    image: undefined,
                    name: "Land Cruiser",
                  },
                },
                {
                  id: "6",
                  attributes: {
                    image: undefined,
                    name: "Yaris",
                  },
                },
                {
                  id: "7",
                  attributes: {
                    image: undefined,
                    name: "Camry",
                  },
                },
              ],
            },
          },
        },
      ],
    },
  };

  const mocks = (
    data: CarMakerAndModelsQueryResponse
  ): Array<MockedResponse> => [
    {
      request: {
        query: GET_CAR_MAKERS_AND_MODELS,
        variables: {
          page: 100,
        },
      },
      result: {
        data,
      },
    },
  ];

  const renderComponentWithMock = (data: CarMakerAndModelsQueryResponse) => {
    return render(
      withWrapper(
        <MockedProvider mocks={mocks(data)} addTypename={false}>
          <CarSelection />
        </MockedProvider>
      )
    );
  };

  test("should return empty list when no item includes given text", async () => {
    const { getByTestId } = renderComponentWithMock(carsData);

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const searchField = await getByTestId("carSelection-search");
    fireEvent.change(searchField, { target: { value: "Random" } });

    const emptyPageComponent = getByTestId("EmptyPage");
    expect(emptyPageComponent).not.toBeNull();
  });

  test("should return all car models and makers when search text field is empty", async () => {
    const { getByTestId } = renderComponentWithMock(carsData);

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const searchField = await getByTestId("carSelection-search");
    fireEvent.change(searchField, { target: { value: "" } });

    const carMakers = getByTestId("CarMakers");
    expect(carMakers.children.length).toBe(carsData.makers.data.length);

    const audiCarMaker = getByTestId("CarMaker-1");
    expect(audiCarMaker.children.length - 1).toBe(4);
  });
  test("should return Only car maker and models that contains given text", async () => {
    const { getByTestId } = renderComponentWithMock(carsData);

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const searchField = await getByTestId("carSelection-search");
    fireEvent.change(searchField, { target: { value: "toy" } });

    const carMakers = getByTestId("CarMakers");
    expect(carMakers.children.length).toBe(1);

    const toyotaCarMaker = getByTestId("CarMaker-2");
    expect(toyotaCarMaker.children.length - 1).toBe(4);
  });
  test("should return Only models that match given text", async () => {
    const { getByTestId } = renderComponentWithMock(carsData);

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const searchField = await getByTestId("carSelection-search");
    fireEvent.change(searchField, { target: { value: "A1" } });

    const carMakers = getByTestId("CarMakers");
    expect(carMakers.children.length).toBe(1);

    const toyotaCarMaker = getByTestId("CarMaker-1");
    expect(toyotaCarMaker.children.length - 1).toBe(1);
  });

  test("it should render all car makers", async () => {
    const { getByTestId } = renderComponentWithMock(carsData);

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const carMakersComponent = await screen.getByTestId("CarMakers");

    expect(carMakersComponent.children.length).toBe(2);
  });

  test("it should render empty component when query respond with empty list", async () => {
    const { getByTestId } = renderComponentWithMock({
      makers: {
        data: [],
      },
    });

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const emptyPageComponent = getByTestId("EmptyPage");
    expect(emptyPageComponent).not.toBeNull();
  });

  test("it should render loading component while data fetch query still loading", () => {
    renderComponentWithMock(carsData);
    const loadingComponent = screen.getByTestId("Loading");

    expect(loadingComponent).toBeInTheDocument();
  });

  test("should show reset button in search field when search value is not empty", async () => {
    const { getByTestId, queryByAltText } = renderComponentWithMock(carsData);

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    expect(queryByAltText("ResetIcon")).toBeNull();

    const searchField = await getByTestId("carSelection-search");
    fireEvent.change(searchField, { target: { value: "Audi" } });

    const resetIcon = getByTestId("search-reset");
    expect(resetIcon).not.toBeNull();
  });

  test("should reset search text field when reset button is clicked", async () => {
    const { getByTestId } = renderComponentWithMock(carsData);
    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const searchField = await getByTestId("carSelection-search");
    fireEvent.change(searchField, { target: { value: "Audi" } });
    expect(searchField).toHaveValue("Audi");

    const resetIcon = getByTestId("search-reset");
    fireEvent.click(resetIcon);

    const emptySearchField = await getByTestId("carSelection-search");
    expect(emptySearchField).toHaveValue("");
  });

  test("should go back to previous page when back button is clicked", async () => {
    const router = useRouter();

    const { getByTestId } = renderComponentWithMock(carsData);
    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const backButton = await getByTestId("car-selection-back-button");
    fireEvent.click(backButton);

    expect(router.back).toHaveBeenCalled();
  });

  test("it should mount", async () => {
    const { getByTestId } = renderComponentWithMock(carsData);

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    const carSelection = await screen.getByTestId("CarSelection");

    expect(carSelection).toBeInTheDocument();
  });

  test("it should match snapshot", async () => {
    const { getByTestId, container } = renderComponentWithMock(carsData);

    await waitFor(() => {
      expect(getByTestId("CarSelection")).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });
});
