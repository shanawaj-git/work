import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EmptyPage from "../EmptyPage";

describe("<EmptyPage />", () => {
  test("it should render EmptyPage with given message", () => {
    const { getByTestId } = render(
      <EmptyPage>
        <p data-testid="emptyPage-message">No Data Available</p>
      </EmptyPage>
    );

    const emptyPage = getByTestId("EmptyPage");
    const emptyMessage = getByTestId("emptyPage-message");

    expect(emptyPage).toBeInTheDocument();
    expect(emptyMessage).toBeInTheDocument();
  });
  test("it should mount", () => {
    render(<EmptyPage />);

    const emptyPage = screen.getByTestId("EmptyPage");

    expect(emptyPage).toBeInTheDocument();
  });
});
