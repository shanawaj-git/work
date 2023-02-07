import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ItemCardWithAction from "../ItemCardWithAction";

const itemText = "Lorem Ipsum";
const itemId = "1";

const onClickHandlerMockFn = jest.fn();
const renderComponent = () => {
  return render(
    <ItemCardWithAction
      itemId={itemId}
      itemText={itemText}
      onClick={onClickHandlerMockFn}
    />
  );
};

describe("<ItemCardWithAction />", () => {
  test("it should mount", () => {
    const tree = renderComponent();
    const itemCardWithAction = tree.getByTestId(/itemCardWithAction-1/i);
    expect(itemCardWithAction).toBeInTheDocument();
  });

  test("it should mount and match to the snapshot", () => {
    const tree = renderComponent();
    expect(tree.container.innerHTML).toMatchSnapshot();
  });

  test("when itemText is passed, it should be in the tree document", () => {
    const tree = renderComponent();
    expect(tree.getByText(itemText)).toBeInTheDocument();
  });

  test("onClickHanlder is passed, when user clicks on item, it should call the handler", () => {
    const tree = renderComponent();
    const itemElement = tree.getByTestId(/itemCardWithAction-1/i);
    fireEvent(itemElement, new MouseEvent("click", { bubbles: true }));
    expect(onClickHandlerMockFn).toBeCalled();
  });
});
