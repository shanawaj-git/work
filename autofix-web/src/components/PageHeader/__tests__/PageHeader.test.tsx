import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PageHeader from "../PageHeader";

describe("<PageHeader />", () => {
  test("it should mount", () => {
    render(<PageHeader />);

    const pageHeader = screen.getByTestId("PageHeader");

    expect(pageHeader).toBeInTheDocument();
  });

  test("it should render child component", () => {
    const text = "I'm a child within header component";
    const pageHeader = render(
      <PageHeader>
        <p data-testid="child">{text}</p>
      </PageHeader>
    );
    const child = pageHeader.getByTestId("child");

    expect(child.innerHTML).toContain(text);
  });

  test("it should match snapshot", () => {
    const { container } = render(<PageHeader />);

    expect(container).toMatchSnapshot();
  });
});
