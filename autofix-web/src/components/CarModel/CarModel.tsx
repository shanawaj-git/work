import React, { FC } from "react";
import ArrowForwardIcon from "@/assets/arrow-forward-icon.svg";
import { CarModelType } from "../../Types/CarModel";
import { utils } from "@albathanext/design-system";

interface CarModelProps {
  data: CarModelType;
  testId?: string;
  className?: string;
}

const CarModel: FC<CarModelProps> = ({ ...props }: CarModelProps) => {
  const { data, testId, className } = props;
  return (
    <div
      className={"flex p-5 mt-3 items-center justify-between rounded border border-solid".concat(
        " ",
        className || ""
      )}
      data-testid={`CarModel-${testId || data.id}`}
      style={{
        gap: "10px",
        background: utils.colorSelector("c200"),
        borderColor: "rgba(0, 0, 0, 0.08)",
      }}
    >
      <p
        className="font-normal font-[500] text-base leading-6"
        style={{
          color: utils.colorSelector("p700"),
        }}
      >
        {data.name}
      </p>
      <div>
        <img
          className="min-h-3.5 min-w-3 left-1.25 top-4.5 rounded-none"
          src={ArrowForwardIcon}
          alt={ArrowForwardIcon}
        />
      </div>
    </div>
  );
};

export default CarModel;
