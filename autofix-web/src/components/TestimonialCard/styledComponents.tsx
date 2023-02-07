import styled from "styled-components";
import TestimonialCard from "@/components/TestimonialCard/index";
import { utils } from "@albathanext/design-system";

export const StyledTestimonialCard = styled(TestimonialCard)`
  width: 100%;
  height: ${(props) => props.height}px;
  padding-left: 16px;
  padding-top: 16px;
  background-image: ${(props) => `url(${props.content.img})`};
  background-repeat: no-repeat;
  background-size: cover;

  .testimonial-card-text {
    width: 70%;
    height: 234px;
    //font-family: Neue Haas Grotesk Display Pro;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0.3px;
    color: ${utils.colorSelector("c500")};
    overflow: hidden;
  }

  .testimonial-card-stars {
    width: fit-content;
    display: flex;
    justify-content: space-between;
    padding-bottom: 7px;
    gap: 9px;
  }

  .testimonial-card-star {
    width: 17px;
    height: 17px;
  }

  .testimonial-card-username {
    //font-family: Neue Haas Grotesk Display Pro;
    font-size: 15px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.30000001192092896px;
    text-align: left;
  }

  .testimonial-card-footer {
    width: 100%;
    position: absolute;
    bottom: 16px;
  }
`;
