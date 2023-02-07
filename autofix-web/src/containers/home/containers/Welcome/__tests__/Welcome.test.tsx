import React from "react";

import { Welcome } from "../";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import { useRouter } from "next/router";

describe("<Welcome />", () => {
  const router = useRouter();
  test("it should mount", () => {
    const tree = render(withWrapper(<Welcome />));
    tree.rerender(withWrapper(<Welcome />));
    expect(tree.getAllByTestId("Welcome")).toBeTruthy();
  });
  test("it should mount", () => {
    const tree = render(withWrapper(<Welcome />));

    expect(tree.container.innerHTML).toMatchSnapshot();
  });
  test("page should have Start Now Button and when user clicks on it, should redirect to /car-selection page", () => {
    const tree = render(withWrapper(<Welcome />));
    const button = tree.getByTestId("home-welcome-button-start");
    expect(button.textContent).toBe("Start Now");
    fireEvent(button, new MouseEvent("click", { bubbles: true }));
    expect(router.push).toBeCalledWith("/car-selection");
  });
});
