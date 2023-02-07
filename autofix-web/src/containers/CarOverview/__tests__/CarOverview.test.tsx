import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CarOverview, { pageName, USER_SELECTED_CAR_DETAILS } from "..";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import { useRouter } from "next/router";
import * as mockCarsQueryResponse from "./CarsQueryResponse.json";
import client from "@/apollo/index";

const asyncRenderComponent = async () => {
  let tree;
  await act(async () => {
    tree = render(withWrapper(<CarOverview />));
  });
  return tree;
};

const selectedCarDetails = {
  engineType: {
    id: "69",
    name: "1.6 VVT-i",
  },
  model: {
    id: "23",
    name: "Corolla",
  },
  maker: {
    id: "10",
    name: "Toyota",
    logo: "https://banner2.cleanpng.com/20171201/3ce/toyota-logo-picture-5a21ff4daacf07.7378398915121774856996.jpg",
  },
  year: {
    id: "49",
    value: 2022,
  },
  image:
    "https://www.drivearabia.com/carprices/media/catalog/5d0b8000581442020_Toyota_Corolla_front.jpg",
  mileage: "15000",
};

describe("<CarOverview /> ", () => {
  const router = useRouter();
  router.isReady = true;

  const carOverviewTests = () => {
    describe("Car Overview test cases", () => {
      test("it should mount", async () => {
        const screen = await asyncRenderComponent();
        const carOverview = screen.getByTestId(pageName);
        expect(carOverview).toBeInTheDocument();
      });

      test("it should mount and match to the snapshot", async () => {
        const tree = await asyncRenderComponent();
        expect(tree.container.innerHTML).toMatchSnapshot();
      });

      test("it should render car vehicle image with alternative text", async () => {
        const tree = await asyncRenderComponent();
        const element = tree.getByTestId("car-image");
        expect(element).toBeInTheDocument();
        expect(element.getAttribute("alt")).toBe("vehicle image");
      });

      test("it should render car name with make model year combination", async () => {
        const tree = await asyncRenderComponent();
        const element = tree.getByTestId("car-make-model-year");
        expect(element).toBeInTheDocument();
        expect(element.innerHTML).toBe("Toyota Corolla 2022");
      });

      test("it should render make logo", async () => {
        const tree = await asyncRenderComponent();
        const element = tree.getByTestId("car-make-logo");
        expect(element).toBeInTheDocument();
        expect(element.getAttribute("alt")).toBe("Toyota logo");
      });

      test("it should render car mileage", async () => {
        const tree = await asyncRenderComponent();
        const labelElement = tree.getByTestId("car-mileage-label");
        const valueElement = tree.getByTestId("car-mileage");
        expect(labelElement).toBeInTheDocument();
        expect(labelElement.innerHTML).toBe("Mileage");
        expect(valueElement).toBeInTheDocument();
        expect(valueElement.innerHTML).toBe("15000 km");
      });

      test("it should render edit car details link and it should be clickable", async () => {
        const tree = await asyncRenderComponent();
        const editElement = tree.getByTestId("edit-car-details-link");
        expect(editElement).toBeInTheDocument();
        expect(editElement.innerHTML).toContain("Edit car details");
        fireEvent(editElement, new MouseEvent("click", { bubbles: true }));
        expect(router.push).toHaveBeenCalled();
      });

      test("verify confirm buton is on dom and enabled ", async () => {
        const tree = await asyncRenderComponent();
        const buttonElement = tree.getByTestId(`${pageName}-button-confirm`);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.textContent).toContain("Confirm car details");
        expect(buttonElement).toBeEnabled();
      });

      test("when user clicks on confirm car details, it should redirect to recommended-maintenance ", async () => {
        const tree = await asyncRenderComponent();
        const buttonElement = tree.getByTestId(`${pageName}-button-confirm`);
        fireEvent(buttonElement, new MouseEvent("click", { bubbles: true }));
        expect(router.push).toBeCalledWith("/recommended-maintenance");
      });

      test("when user clicks back button, should redirect to previous route and it calls only once", async () => {
        const tree = await asyncRenderComponent();
        const button = tree.getByTestId(`${pageName}-back-button`);
        fireEvent(button, new MouseEvent("click", { bubbles: true }));
        expect(router.back).toBeCalledTimes(1);
      });
    });
  };

  const engineNotSpecifiedTest = () => {
    describe("Engine Type Not Specified", () => {
      test("it should render engine type", async () => {
        const tree = await asyncRenderComponent();
        const labelElement = tree.getByTestId("car-engine-type-label");
        const valueElement = tree.getByTestId("car-engine-type");
        expect(labelElement).toBeInTheDocument();
        expect(labelElement.innerHTML).toBe("Engine");
        expect(valueElement).toBeInTheDocument();
        expect(valueElement.innerHTML).toBe("Not Specified");
      });

      test("when user clicks on confirm car details button, it should save the data in localStorage ", async () => {
        const tree = await asyncRenderComponent();
        const buttonElement = tree.getByTestId(`${pageName}-button-confirm`);
        fireEvent(buttonElement, new MouseEvent("click", { bubbles: true }));
        const selectedCar = {
          ...selectedCarDetails,
          engineType: { name: "Not Specified" },
        };
        expect(window.localStorage.getItem(USER_SELECTED_CAR_DETAILS)).toBe(
          JSON.stringify(selectedCar)
        );
      });
    });
  };

  describe("when modelId, YearId and EngineId present in query params", () => {
    beforeEach(() => {
      client.query = jest.fn();
      client.query.mockResolvedValue(mockCarsQueryResponse);
      router.query = {
        mileage: "15000",
        yearId: "49",
        modelId: "23",
        engineId: "69",
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    carOverviewTests();

    test("it should render engine type", async () => {
      const tree = await asyncRenderComponent();
      const labelElement = tree.getByTestId("car-engine-type-label");
      const valueElement = tree.getByTestId("car-engine-type");
      expect(labelElement).toBeInTheDocument();
      expect(labelElement.innerHTML).toBe("Engine");
      expect(valueElement).toBeInTheDocument();
      expect(valueElement.innerHTML).toBe("1.6 VVT-i");
    });

    test("when user clicks on confirm car details button, it should save the data in localStorage ", async () => {
      const tree = await asyncRenderComponent();
      const buttonElement = tree.getByTestId(`${pageName}-button-confirm`);
      fireEvent(buttonElement, new MouseEvent("click", { bubbles: true }));
      expect(window.localStorage.getItem(USER_SELECTED_CAR_DETAILS)).toBe(
        JSON.stringify(selectedCarDetails)
      );
    });
  });

  describe("when modelId, YearId and default EngineId present in query params", () => {
    beforeEach(() => {
      client.query = jest.fn();
      client.query.mockResolvedValue(mockCarsQueryResponse);
      router.query = {
        mileage: "15000",
        yearId: "49",
        modelId: "23",
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    carOverviewTests();
    engineNotSpecifiedTest();
  });

  describe("when modelId, YearId combination is wrong and default EngineId present in query params", () => {
    beforeEach(() => {
      client.query = jest.fn();
      client.query.mockResolvedValue(mockCarsQueryResponse);
      router.query = {
        mileage: "15000",
        modelId: "23",
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    carOverviewTests();
    engineNotSpecifiedTest();
  });
});
