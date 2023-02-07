import { NextPage } from "next";
import Section from "@/components/Section";
import { Article, utils } from "@albathanext/design-system";
import { StyledCarousel } from "@/containers/home/containers/Testimonial/styledComponents";
import { FormattedMessage } from "react-intl";
import React, { useEffect, useRef, useState } from "react";
import { StyledTestimonialCard } from "@/components/TestimonialCard/styledComponents";
import { TestimonialType } from "@/services/home/testimonial";

interface Shape {
  offsetHeight: number;
}

const Testimonial: NextPage<{ testimonials: TestimonialType[] }> = ({
  testimonials,
}) => {
  const [sliderContainerHeight, setSlideContainerHeight] = useState(0);

  const carouselRef: React.MutableRefObject<Shape | undefined> = useRef();

  useEffect(() => {
    if (!carouselRef.current || sliderContainerHeight !== 0) return;
    const height: number = carouselRef.current.offsetHeight;
    setSlideContainerHeight(height);
  }, [carouselRef.current]);

  function content(activeStep: number, height: number) {
    return testimonials?.map((step, index) => (
      <div key={index}>
        {Math.abs(activeStep - index) <= 2 ? (
          <StyledTestimonialCard
            testId={`testimonial-card-${index}`}
            className={"testimonial-card"}
            content={step}
            height={height}
          />
        ) : null}
      </div>
    ));
  }

  return (
    <Section
      data-testid="testimonial-section"
      style={{
        background: utils.colorSelector("p600"),
      }}
      className="flex flex-col justify-between py-[100px] text-white bg-cover bg-no-repeat"
    >
      <div className={"flex flex-col flex-1 "}>
        <div className="px-6">
          <Article
            title={<FormattedMessage id="home.testimonial.title" />}
            divider
            dividerProps={{
              style: { borderColor: utils.colorSelector("P300") },
              className: "mt-2",
            }}
            titleProps={{
              color: "white",
              className: "text-4xl whitespace-pre-line",
            }}
          />
        </div>
        <StyledCarousel
          _ref={carouselRef}
          className={"carousel h-full"}
          direction="ltr"
          nextButton={true}
          backButton={false}
          content={content(1, sliderContainerHeight)}
          maxSteps={testimonials?.length || 0}
        />
      </div>
    </Section>
  );
};

export default Testimonial;
