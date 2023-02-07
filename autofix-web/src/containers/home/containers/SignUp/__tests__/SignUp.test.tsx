import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SignUp } from "../index";
import { withWrapper } from "@/utils/IntlProviderWrapper";

describe("<SignUp />", () => {
  test("it should mount", () => {
    render(withWrapper(<SignUp />));
    const signUp = screen.getByTestId("SignUp");

    expect(signUp).toBeInTheDocument();
  });
  test("it should Match the snapshot", () => {
    const { container } = render(withWrapper(<SignUp />));
    expect(container.innerHTML).toMatchSnapshot();
  });
  test("Should throw an error if input is not a correct email", () => {
    const { container, rerender, getByPlaceholderText } = render(
      withWrapper(<SignUp />)
    );
    const input = getByPlaceholderText("Your email");
    fireEvent.change(input, {
      target: {
        value: "Test Example",
      },
    });
    rerender(withWrapper(<SignUp />));
    expect(container.innerHTML).toMatchSnapshot();
  });
  test("Should not throw an error if input is a correct email", () => {
    const { container, rerender, getByPlaceholderText } = render(
      withWrapper(<SignUp />)
    );
    const input = getByPlaceholderText("Your email");
    fireEvent.change(input, {
      target: {
        value: "rajaosama.me@gmail.com",
      },
    });
    rerender(withWrapper(<SignUp />));
    expect(container.innerHTML).toMatchSnapshot();
  });
});
