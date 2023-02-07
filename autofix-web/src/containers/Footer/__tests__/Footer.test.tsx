import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Footer } from "../index";
import { withWrapper } from "@/utils/IntlProviderWrapper";

const footer = {
  content: [],
  poweredBy: {},
};
const footerWithData =
  '{"content":[{"__typename":"ComponentLinkListOfLinksWithHeadingWrapper","name":"About","links":[{"__typename":"ComponentLinkLink","name":"Home","link":"#"},{"__typename":"ComponentLinkLink","name":"Become a partner","link":"#"}]},{"__typename":"ComponentLinkListOfLinksWithHeadingWrapper","name":"Legal","links":[{"__typename":"ComponentLinkLink","name":"Privacy policy","link":"#"},{"__typename":"ComponentLinkLink","name":"Terms & Policy","link":"#"}]},{"__typename":"ComponentLinkListOfLinksWithHeadingWrapper","name":"Account","links":[{"__typename":"ComponentLinkLink","name":"Log in","link":"#"},{"__typename":"ComponentLinkLink","name":"Sign up","link":"#"},{"__typename":"ComponentLinkLink","name":"Support","link":"#"}]}],"poweredBy":{"__typename":"ComponentLinkImageWithLink","image":"https://autofix-apim.azure-api.net/cms//uploads/Frame_4f02eef082.svg","link":{"__typename":"ComponentLinkLink","link":"#","name":"Powered by"}}}';
describe("<Footer />", () => {
  test("it should mount", () => {
    const { container } = render(withWrapper(<Footer footer={footer} />));
    expect(container.innerHTML).toMatchSnapshot();
  });
  test("it should mount with Footer Data", () => {
    const { container } = render(
      withWrapper(<Footer footer={JSON.parse(footerWithData)} />)
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});
