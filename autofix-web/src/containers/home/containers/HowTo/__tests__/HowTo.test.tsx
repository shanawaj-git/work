import React from "react";
import { HowTo } from "..";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { withWrapper } from "@/utils/IntlProviderWrapper";

const homeActions = [
  {
    desc: "and find out what is wrong with your car or choose a specific service.",
    icon: "http://strapi-dev-autofix.uaenorth.azurecontainer.io:1337/uploads/option1_a78924043f.svg",
    name: "Run diagnostics",
  },
  {
    desc: "for various services and parts, as well as an estimated time until completion.",
    icon: "http://strapi-dev-autofix.uaenorth.azurecontainer.io:1337/uploads/icon2_5537eea71f.svg",
    name: "See approximate prices",
  },
  {
    desc: "in one of workshops based on reviews and compare prices.",
    icon: "http://strapi-dev-autofix.uaenorth.azurecontainer.io:1337/uploads/icon3_c3ace407ba.svg",
    name: "Book a meeting",
  },
];

describe("<HowTo />", () => {
  test("it should mount", () => {
    const tree = render(withWrapper(<HowTo actions={homeActions} />));
    expect(tree.getAllByTestId("howto-section")).toBeTruthy();
  });
  test("it should mount and match the snapshot", () => {
    const tree = render(withWrapper(<HowTo actions={homeActions} />));
    expect(tree.container.innerHTML).toMatchSnapshot();
  });
});
