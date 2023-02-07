import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../index";
import { withWrapper } from "@/utils/IntlProviderWrapper";

describe("<Home />", () => {
  test("it should", () => expect(true).toBeTruthy());

  test("it should mount", () => {
    const tree = render(withWrapper(<Home />, { en: {} }));
    tree.rerender(withWrapper(<Home />, { ar: {} }));

    expect(tree.container.innerHTML).toMatchSnapshot();
  });
});
