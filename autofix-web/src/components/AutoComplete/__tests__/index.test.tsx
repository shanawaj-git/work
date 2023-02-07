import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AutoCompleteComponent } from "../";
import TextField from "@mui/material/TextField";
import * as Map from "../../../services/map";
import * as designSystem from "@albathanext/design-system";

jest.mock("@albathanext/design-system", () => ({
  useScript: jest.fn().mockReturnValue(true),
}));

jest.mock("lodash", () => ({
  debounce: (func) => (e) => func(e),
}));

const autocompleteMulti = jest.fn();
const detailsMulti = jest.fn();
global.woosmap = {
  multisearch: jest.fn().mockReturnValue({
    autocompleteMulti,
    detailsMulti,
  }),
};

describe("<AutoCompleteComponent />", () => {
  test("it should mount", () => {
    render(returnComponent({ onAddressSelection: console.log }));

    const section = screen.getByTestId("AutoComplete");
    expect(section).toBeInTheDocument();
  });

  test("it should Match The SnapShot", () => {
    const { container } = render(
      returnComponent({ onAddressSelection: console.log })
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
  test("it should suggest when some one type", () => {
    const processAutoComplete = jest.fn().mockReturnValue([
      {
        id: "option1",
        label: "option 1",
      },
    ]);

    jest
      .spyOn(Map, "processAutoComplete")
      .mockImplementation(processAutoComplete);

    const { container } = render(
      returnComponent({ onAddressSelection: console.log })
    );
    const input = container.getElementsByClassName("MuiInputBase-input")[0];

    act(() => {
      fireEvent.change(input, {
        target: {
          value: "One Central",
        },
      });
    });

    waitFor(
      () => {
        expect(processAutoComplete).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
  test("it should render options when  state updated", async () => {
    const processAutoComplete = jest.fn().mockReturnValue([
      {
        id: "option1",
        label: "option 1",
      },
    ]);

    jest
      .spyOn(Map, "processAutoComplete")
      .mockImplementation(processAutoComplete);

    const { container, rerender } = render(
      returnComponent({ onAddressSelection: console.log })
    );

    const input = container.getElementsByClassName("MuiInputBase-input")[0];
    act(() => {
      fireEvent.change(input, {
        target: {
          value: "One Central",
        },
      });
    });
    await act(async () => {
      await rerender(returnComponent({ onAddressSelection: console.log }));
    });

    await waitFor(() => {
      expect(container.innerHTML).toMatchSnapshot();
    });
  });
  test("it should trigger onAddressSelection on The selection of option ", async () => {
    const onAddressSelection = jest.fn();
    jest
      .spyOn(Map, "getPlaceDetails")
      .mockReturnValueOnce(Promise.resolve({ geometry: [] }));

    const processAutoComplete = jest.fn().mockReturnValue([
      {
        id: "option1",
        key: "option1",
        label: "option 1",
      },
    ]);

    jest
      .spyOn(Map, "processAutoComplete")
      .mockImplementation(processAutoComplete);

    const { container, rerender } = render(
      returnComponent({ onAddressSelection: onAddressSelection })
    );
    const input = container.getElementsByClassName("MuiInputBase-input")[0];
    act(() => {
      fireEvent.change(input, {
        target: {
          value: "One Central",
        },
      });
    });
    await act(async () => {
      await rerender(
        returnComponent({ onAddressSelection: onAddressSelection })
      );
    });

    fireEvent.click(input);
    await waitFor(() => {
      expect(container.innerHTML).toMatchSnapshot();
    });

    const li = container.getElementsByClassName("MuiAutocomplete-option")[0];
    fireEvent.click(li);

    await waitFor(() => {
      expect(onAddressSelection).toBeCalled();
    });
  });

  test("it should mount with Script false", () => {
    jest.spyOn(designSystem, "useScript").mockReturnValue(false);
    render(returnComponent({ onAddressSelection: console.log }));

    const section = screen.getByTestId("AutoComplete");
    expect(section).toBeInTheDocument();
  });
});

const returnComponent = ({ onAddressSelection }) => {
  return (
    <AutoCompleteComponent
      onAddressSelection={onAddressSelection}
      inputComponent={(params) => <TextField {...params} data-testid="input" />}
    />
  );
};
