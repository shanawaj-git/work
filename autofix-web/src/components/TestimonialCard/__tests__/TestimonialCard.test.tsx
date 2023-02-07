import { render } from "@testing-library/react";
import TestimonialCard from "../index";

describe("<TestimonialCard/>", () => {
  const testimonialContent = {
    title: "Testimonial",
    content: "This is a testimonial from a customer",
    img: "",
    rating: 3,
    customer: "Customer",
  };
  const testId = "card-1";

  test("it should render component with the right text", () => {
    const component = render(
      <TestimonialCard
        className={"testimonial-card"}
        content={testimonialContent}
        testId={testId}
      />
    );
    const testimonialText = component.getByTestId(
      `testimonial-card-content-${testId}`
    );

    expect(testimonialText.innerHTML).toBe(testimonialContent.content);
  });

  test("it should render component with the right number of stars", () => {
    const component = render(
      <TestimonialCard
        className={"testimonial-card"}
        content={testimonialContent}
        testId={testId}
      />
    );
    const stars = component.getByTestId(`testimonial-card-stars-${testId}`);

    expect(stars.children.length).toBe(testimonialContent.rating);
  });

  test("it should render component with the right customer name", () => {
    const component = render(
      <TestimonialCard
        className={"testimonial-card"}
        content={testimonialContent}
        testId={testId}
      />
    );
    const customer = component.getByTestId(
      `testimonial-card-customer-${testId}`
    );

    expect(customer.innerHTML).toBe(testimonialContent.customer);
  });

  test("it should render component", () => {
    const { container } = render(
      <TestimonialCard
        className={"testimonial-card"}
        content={testimonialContent}
        testId={"card-1"}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
