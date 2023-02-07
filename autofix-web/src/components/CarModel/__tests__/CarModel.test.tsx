import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CarModel from "../CarModel";

describe("<CarModel />", () => {
  const carModel = {
    id: "1",
    name: "Corolla",
  };

  test("it should mount", () => {
    render(<CarModel data={carModel} />);

    const component = screen.getByTestId(`CarModel-${carModel.id}`);

    expect(component).toBeInTheDocument();
  });

  test("it should match snapshot", () => {
    const { container } = render(<CarModel data={carModel} />);

    expect(container).toMatchSnapshot();
  });
});
