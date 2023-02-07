import React from "react";
import { Intro } from "../";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { withWrapper } from "@/utils/IntlProviderWrapper";

const services = [
  {
    desc: null,
    icon: "http://localhost:1337/uploads/oil_a90c56f683.png",
    name: "Oil & Filter Change",
  },
  {
    desc: null,
    icon: "http://localhost:1337/uploads/engine_0bfe9a5856.png",
    name: "Logbook service",
  },
  {
    desc: null,
    icon: null,
    name: "Replace Rear Brake Pads",
  },
];

describe("<Intro />", () => {
  test("it should mount", () => {
    const tree = render(withWrapper(<Intro services={services} />));
    expect(tree.getAllByTestId("intro-section")).toBeTruthy();
  });
  test("it should mount and match the snapshot", () => {
    const tree = render(withWrapper(<Intro services={services} />));
    expect(tree.container.innerHTML).toMatchSnapshot();
  });
  test("it should mount and match the snapshot if empty services", () => {
    const tree = render(withWrapper(<Intro services={[]} />));
    expect(tree.container.innerHTML).toMatchSnapshot();
  });
});
