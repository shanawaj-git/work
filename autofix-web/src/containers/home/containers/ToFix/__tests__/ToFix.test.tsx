import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ToFix } from "../index";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import { useRouter } from "next/router";

describe("<ToFix />", () => {
  it("it should mount", () => {
    render(withWrapper(<ToFix />));

    const test = screen.getByTestId("ToFix");

    expect(test).toBeInTheDocument();
  });
  it("it Match the snapshot", () => {
    const tree = render(withWrapper(<ToFix />));
    expect(tree.container.innerHTML).toMatchSnapshot();
  });

  test("it should trigger the navigate function", () => {
    const mockRouter = useRouter();
    const tree = render(withWrapper(<ToFix />));
    const element = tree.getByTestId("home-tofix-startnow");
    fireEvent.click(element);
    expect(mockRouter.push).toBeCalledTimes(1);
  });
});
