import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import RecommendedMaintenance, {
  toFixed,
  pageName,
  removeSpaces,
} from "../index";
import { useRouter } from "next/router";

const data = [
  {
    title: "item 1",
    cost: "500 - 800 USD",
  },
  {
    title: "item 2",
    cost: "500 - 800 USD",
  },
  {
    title: "item 3",
    cost: "500 - 800 USD",
    subItems: [
      "Brake linings",
      "Drums and brake pads/discs",
      "Ball joints and dust covers",
      "Drive shaft boots",
      "Engine coolant",
      "Exhaust pipes and mountings",
      "Radiator and condenser",
    ],
  },
];

describe("<RecommendedMaintenance />", () => {
  test("it should mount", () => {
    const { getByTestId } = render(
      withWrapper(<RecommendedMaintenance suggestedMaintenance={data} />)
    );

    const recommendedMaintenance = getByTestId(pageName);

    expect(recommendedMaintenance).toBeInTheDocument();
  });
  test("it Match The SnapShot", () => {
    const { container } = render(
      withWrapper(<RecommendedMaintenance suggestedMaintenance={data} />)
    );
    expect(container).toMatchSnapshot();
  });

  test("should go back to previous page when back button is clicked", async () => {
    const router = useRouter();
    const { getByTestId } = render(
      withWrapper(<RecommendedMaintenance suggestedMaintenance={data} />)
    );

    const backButton = await getByTestId(`${pageName}-back-button`);
    fireEvent.click(backButton);

    expect(router.back).toHaveBeenCalled();
  });
  test("it should change total amount", async () => {
    const { getByTestId } = render(
      withWrapper(<RecommendedMaintenance suggestedMaintenance={data} />)
    );
    let total = getByTestId("total-amount").innerHTML;
    expect(total).toBe("0.00 USD");
    const element = getByTestId(removeSpaces("item 1"));
    fireEvent.click(element);
    total = getByTestId("total-amount").innerHTML;
    expect(total).toBe("800.00 USD");
  });

  test("when user clicks back button on header, should redirect to previous route and it calls only once", () => {
    const mockRouter = useRouter();
    const tree = render(
      withWrapper(
        <RecommendedMaintenance
          suggestedMaintenance={[
            ...data,
            {
              title: "item 4",
              cost: "500 - 800.23123213 USD",
            },
          ]}
        />
      )
    );
    const button = tree.getByTestId(`${pageName}-back-button`);
    fireEvent(button, new MouseEvent("click", { bubbles: true }));
    expect(mockRouter.back).toBeCalled();
  });

  test("it should become selected and unselect once some one click on the item.", () => {
    const { getByTestId } = render(withWrapper(<RecommendedMaintenance />));
    const element = getByTestId(removeSpaces("Rotate tires 1"));
    fireEvent.click(element);
    expect(
      getByTestId(`${removeSpaces("Rotate tires 1")}-selected`)
    ).toBeTruthy();
    const elementCheck = getByTestId(
      `${removeSpaces("Rotate tires 1")}-selected`
    );
    fireEvent.click(elementCheck);
    expect(getByTestId(removeSpaces("Rotate tires 1"))).toBeTruthy();
  });

  test("It should round off to fix 2 zero if there are alot of digits after decimal or if there is no decimal to begin with.", () => {
    const a = toFixed("3213.32212313");
    expect(a).toBe("3213.32");
    const b = toFixed("22");
    expect(b).toBe("22.00");
  });
});
