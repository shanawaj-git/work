import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { withWrapper } from "@/utils/IntlProviderWrapper";
import Testimonial from "../index";

describe("<Testimonial />", () => {
  const testimonials = [
    {
      title: "Testimonial",
      content: "This is a testimonial from a customer",
      img: "https://s3-alpha-sig.figma.com/img/8458/48c5/b622b006cfb8fafc6bd63b7c877969e3?Expires=1659916800&Signature=UUriV5UFOKrlOd1K2sb4AjJkrAJmCs79jNMSAfj2zStiTYJuzJrcRkSlzA69xu7D8xqrdSFqe339NMwJHlS6L5ZXYqv64tm2s0vQk0Gqczc12FQUk~6W5je1l6loLG289IYoHVdMnVwzJXO-rG7lqu8sPeSm7-I~AkeFwqF3uDjese-I--7q~6n10SsfeEGWSTPbpn4eaeL7kd-AzhBKKMpl8NvAkNu5kncmL4nGBwy-8f-wW7ve5r~R1ZlOAP1G89CRzanxOUOk84G1-28HBIit33gzmIPYTD0Pz31s1Rwqi9viB9kF~c6G~N5TulZ8AKmMIZl92pW6IcWVuctMiQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      rating: 3,
      customer: "Customer ",
    },
    {
      title: "Testimonial",
      content: "This is a another testimonial from a customer",
      img: "https://s3-alpha-sig.figma.com/img/8458/48c5/b622b006cfb8fafc6bd63b7c877969e3?Expires=1659916800&Signature=UUriV5UFOKrlOd1K2sb4AjJkrAJmCs79jNMSAfj2zStiTYJuzJrcRkSlzA69xu7D8xqrdSFqe339NMwJHlS6L5ZXYqv64tm2s0vQk0Gqczc12FQUk~6W5je1l6loLG289IYoHVdMnVwzJXO-rG7lqu8sPeSm7-I~AkeFwqF3uDjese-I--7q~6n10SsfeEGWSTPbpn4eaeL7kd-AzhBKKMpl8NvAkNu5kncmL4nGBwy-8f-wW7ve5r~R1ZlOAP1G89CRzanxOUOk84G1-28HBIit33gzmIPYTD0Pz31s1Rwqi9viB9kF~c6G~N5TulZ8AKmMIZl92pW6IcWVuctMiQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      rating: 5,
      customer: "Customer ",
    },
  ];

  test("it should render component with all testimonials", () => {
    const component = render(
      withWrapper(<Testimonial testimonials={testimonials} />)
    );

    const firstTestimonialCard = component.getByTestId(`testimonial-card-0`);

    expect(firstTestimonialCard).not.toBeNull();
  });

  test("it should render component and switch testimonial card when button clicked", async () => {
    const component = render(
      withWrapper(<Testimonial testimonials={testimonials} />)
    );

    const nextButton = component.getByRole("button");

    await nextButton.click();
    const secondTestimonialCard = component.getByTestId(`testimonial-card-1`);
    expect(secondTestimonialCard).not.toBeNull();
  });

  test("it should render component and disable next button when it is last card", async () => {
    const component = render(
      withWrapper(<Testimonial testimonials={testimonials} />)
    );
    const nextButton = component.getByRole("button");

    await nextButton.click();

    const disabledNextButton = component.getByRole("button");
    expect(disabledNextButton).toHaveProperty("disabled", true);
  });

  test("it should render empty component when no testimonials available", () => {
    const component = render(withWrapper(<Testimonial testimonials={[]} />));

    expect(() => component.getByTestId("testimonial-card-0")).toThrow();
  });

  test("it should render component and match snapshot", () => {
    const { container } = render(
      withWrapper(<Testimonial testimonials={testimonials} />)
    );

    expect(container.innerHTML).toMatchSnapshot();
  });
});
