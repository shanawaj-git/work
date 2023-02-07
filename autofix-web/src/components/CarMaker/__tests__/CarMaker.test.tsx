import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CarMaker from "../CarMaker";
import { CarMakerType } from "../../../Types/CarMaker";

describe("<CarMaker />", () => {
  const carMakerData: CarMakerType = {
    id: "1",
    name: "Toyota",
    logo: "url",
    models: [
      {
        id: "1",
        name: "Corolla",
        image: "",
      },
    ],
  };

  test("it should not return car maker when given data in empty", () => {
    const { container } = render(<CarMaker data={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  test("it should mount", () => {
    render(<CarMaker data={carMakerData} />);

    const component = screen.getByTestId(`CarMaker-${carMakerData.id}`);

    expect(component).toBeInTheDocument();
  });

  test("it should match snapshot", () => {
    const { container } = render(<CarMaker data={carMakerData} />);

    expect(container).toMatchSnapshot();
  });
});
