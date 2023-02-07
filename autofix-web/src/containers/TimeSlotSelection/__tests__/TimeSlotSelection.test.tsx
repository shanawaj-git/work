import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TimeSlotSelection, { pageName } from "..";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import { useRouter } from "next/router";
import moment from "moment";
const renderComponent = () => {
  return render(withWrapper(<TimeSlotSelection />));
};
describe("<TimeSlotSelection />", () => {
  const router = useRouter();
  test("it should mount", () => {
    renderComponent();

    const timeSlotSelection = screen.getByTestId(pageName);

    expect(timeSlotSelection).toBeInTheDocument();
  });

  test("it should mount and match the snapshot", () => {
    const tree = renderComponent();
    expect(tree.container.innerHTML).toMatchSnapshot();
  });

  test("it should redirect to previous route and it calls only once when user clicks back button on header, ", () => {
    const tree = renderComponent();
    const button = tree.getByTestId(`${pageName}-back-button`);
    fireEvent(button, new MouseEvent("click", { bubbles: true }));
    expect(router.back).toBeCalled();
  });

  test("it should set switch to true when user switches to month", () => {
    const tree = renderComponent();
    const checkbox = tree.getByRole("checkbox");
    expect(checkbox.getAttribute("checked")).toBeFalsy();
    act(() => {
      checkbox.click();
      fireEvent.change(checkbox, { target: { checked: true } });
    });
    waitFor(() => expect(checkbox).toBeChecked());
  });

  test("it should be able to click timeslot for given date and time", () => {
    const initialDate = moment().format("L");
    const tree = renderComponent();
    const button = tree.getByTestId(`dayslot-${initialDate}-timeslot-10:00`);
    expect(button).toBeInTheDocument();
    fireEvent(button, new MouseEvent("click", { bubbles: true }));
  });

  test("it should render the dates in dddd, MMM Do format", () => {
    const initialDate = moment().format("L");
    const formattedDate = moment().format("dddd, MMM Do");
    const tree = renderComponent();
    const dayLabelElement = tree.getByTestId(`dayslot-${initialDate}-label`);
    expect(dayLabelElement).toHaveTextContent(formattedDate);
  });
});
