import React, { FC } from "react";
import { utils } from "@albathanext/design-system";
import { CarModelType } from "../../Types/CarModel";
import { CarMakerType } from "../../Types/CarMaker";
import ItemCardWithAction from "../ItemCardWithAction/ItemCardWithAction";

interface CarMakerProps {
  data?: CarMakerType;
  testId?: string;
  className?: string;
  onModelSelection: (makerId: string, modelId: string) => void;
}

const CarMaker: FC<CarMakerProps> = ({ ...props }: CarMakerProps) => {
  const { testId, className, data, onModelSelection } = props;
  if (!data) return <></>;
  return (
    <div
      className={"pt-6".concat(" ", className || "")}
      data-testid={`CarMaker-${testId || data.id}`}
    >
      <div className="flex items-center justify-between">
        <p
          className="not-italic	font-[500] leading-5.5 text-[17px]"
          style={{
            borderColor: utils.colorSelector("P300"),
          }}
        >
          {data.name}
        </p>
        <div>
          <img
            alt={data.name}
            className="h-5.25 w-9 left-1.25 top-4.5 rounded-none"
            src={`${data.logo}`}
          />
        </div>
      </div>
      {props.data &&
        props.data.models &&
        props.data.models.map((carModel: CarModelType) => (
          <ItemCardWithAction
            key={carModel.id}
            itemText={carModel.name}
            itemId={carModel.id}
            onClick={() => onModelSelection(data.id, carModel.id)}
          />
        ))}
    </div>
  );
};

export default CarMaker;
