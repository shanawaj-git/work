import Star from "@/assets/star.svg";
import { TestimonialType } from "@/services/home/testimonial";

interface TestimonialCardProps {
  content: TestimonialType;
  height: number;
  className: string;
  testId: string;
}

const TestimonialCard = ({ ...props }: TestimonialCardProps) => {
  const { className, content, testId } = props;

  return (
    <div className={className} data-testid={testId}>
      <div
        className={"testimonial-card-text"}
        data-testid={`testimonial-card-content-${testId}`}
      >
        {content.content}
      </div>

      <div className={"testimonial-card-footer"}>
        <div
          className={"testimonial-card-stars"}
          data-testid={`testimonial-card-stars-${testId}`}
        >
          {[...Array(content.rating)].map((e, i) => (
            <img
              key={i}
              alt={`start-${i}`}
              src={Star}
              className={"testimonial-card-star"}
            />
          ))}
        </div>
        <p
          className={"testimonial-card-customer"}
          data-testid={`testimonial-card-customer-${testId}`}
        >
          {content.customer}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
