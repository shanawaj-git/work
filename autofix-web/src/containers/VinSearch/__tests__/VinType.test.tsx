import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import VinType from "../";
import React from "react";
import { useRouter } from "next/router";

describe("<CarSelection />", () => {
  test("it should match snapshot", async () => {
    const { container } = render(
      withWrapper(
        <VinType
          carousel={[
            { description: "Sample description", image: "sampleImage.jpg" },
          ]}
          config={{}}
        />
      )
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  test("it should call router.back if back button is pressed", async () => {
    const router = useRouter();
    const { getByTestId } = render(
      withWrapper(
        <VinType
          carousel={[
            { description: "Sample description", image: "sampleImage.jpg" },
          ]}
          config={{}}
        />
      )
    );
    const buttonElement = getByTestId("vinSearch-header-back-button");

    await fireEvent.click(buttonElement);

    expect(router.back).toBeCalled();
  });

  test("it should throw a helper text and error if wrong VIN is inputted", async () => {
    const { container, getByTestId } = render(
      withWrapper(
        <VinType
          carousel={[
            { description: "Sample description", image: "sampleImage.jpg" },
          ]}
          config={{}}
        />
      )
    );
    const element = getByTestId("vinSearch-search");
    fireEvent.change(element, {
      target: {
        value: "some value",
      },
    });
    const contain = container.innerHTML.match("Invalid VIN code");
    expect(contain).toBeTruthy();
  });
  test("it should not throw a helper text and error if right VIN is inputted", async () => {
    const { container, getByTestId } = render(
      withWrapper(
        <VinType
          carousel={[
            { description: "Sample description", image: "sampleImage.jpg" },
          ]}
          config={{}}
        />
      )
    );
    const element = getByTestId("vinSearch-search");
    fireEvent.change(element, {
      target: {
        value: "SALVA2AE4EH877322",
      },
    });
    const contain = container.innerHTML.match("Invalid VIN code");
    expect(contain).toBeNull();
  });
  test("it should enable the button if vin is correct", async () => {
    const { getByTestId } = render(
      withWrapper(
        <VinType
          carousel={[
            { description: "Sample description", image: "sampleImage.jpg" },
          ]}
          config={{}}
        />
      )
    );
    const element = getByTestId("vinSearch-search");
    fireEvent.change(element, {
      target: {
        value: "SALVA2AE4EH877322",
      },
    });
    const btn = getByTestId("vinSearch-footer-button");
    expect(btn).toBeEnabled();
  });
  test("it should Disable the button if vin is correct", async () => {
    const { getByTestId } = render(
      withWrapper(
        <VinType
          carousel={[
            { description: "Sample description", image: "sampleImage.jpg" },
          ]}
          config={{}}
        />
      )
    );
    const element = getByTestId("vinSearch-search");
    fireEvent.change(element, {
      target: {
        value: "SALVA2AE4EH877322a",
      },
    });
    const btn = getByTestId("vinSearch-footer-button");
    expect(btn).toBeDisabled();
  });
});
