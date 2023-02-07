import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import YearSelection, { pageName } from "..";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import range from "lodash.range";
import { useRouter } from "next/router";

const mockYears = () => {
  return range(1990, 2023, 1).map((value, index) => ({
    id: `${index + 1}`,
    value,
  }));
};

const totalNumberMenuItems = 33; //  for given mockConfig

const renderComponentWithMockData = () => {
  return render(withWrapper(<YearSelection years={mockYears()} />));
};

describe("<YearSelection />", () => {
  const router = useRouter();
  test("it should mount", () => {
    const tree = renderComponentWithMockData();
    expect(tree.getAllByTestId(pageName)).toBeTruthy();
  });
  test("it should mount and match the snapshot", () => {
    const tree = renderComponentWithMockData();
    expect(tree.container.innerHTML).toMatchSnapshot();
  });

  test("when proper config provided, should render horizontal scroll menu", () => {
    const tree = renderComponentWithMockData();
    const check = tree.getByTestId("horizontal-scroll-menu-title");
    expect(check.innerHTML).toBe("1990");
  });

  test("when user clicks on continue button, should redirect to engine-selection route", () => {
    const expectedRouteOptions = {
      pathname: "/engine-selection",
      query: { yearId: "1" },
    };
    const tree = renderComponentWithMockData();
    const button = tree.getByTestId(`${pageName}-button-continue`);
    fireEvent(button, new MouseEvent("click", { bubbles: true }));
    expect(router.push).toBeCalledWith(expectedRouteOptions);
  });

  test("when user clicks back button on header, should redirect to previous route and it calls only once", () => {
    const tree = renderComponentWithMockData();
    const button = tree.getByTestId(`${pageName}-back-button`);
    fireEvent(button, new MouseEvent("click", { bubbles: true }));
    expect(router.back).toBeCalled();
  });

  it("when config is given, it should render items length equal to number of divs in horizontal scroll ", () => {
    const tree = renderComponentWithMockData();
    const itemDivs = tree.container.getElementsByClassName(
      "react-horizontal-scrolling-menu--item"
    );
    expect(itemDivs.length).toBe(totalNumberMenuItems);
  });

  it("when user clicks on horizontal scroll item-2020, it should be selected and display in title", async () => {
    const tree = renderComponentWithMockData();
    const element = tree.getByTestId("scrollable-menu-item-2020");
    fireEvent(element, new MouseEvent("click", { bubbles: true }));
    const check = await waitFor(() =>
      tree.getByTestId("horizontal-scroll-menu-title")
    );

    expect(check.innerHTML).toBe("2020");
  });
});
