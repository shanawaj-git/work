import React, { FC, ReactElement } from "react";
import ArrowForwardIcon from "@/assets/arrow-forward-icon.svg";
import { utils } from "@albathanext/design-system";

interface ItemCardWithActionProps {
  itemId: string | number;
  itemText: string | number | ReactElement;
  containerProps?: object;
  onClick: () => void;
}

const ItemCardWithAction: FC<ItemCardWithActionProps> = ({
  itemId,
  itemText,
  containerProps,
  onClick,
}) => (
  <div
    data-testid={`itemCardWithAction-${itemId}`}
    className={`flex p-5 mt-3 items-center justify-between rounded border cursor-pointer border-solid border-[#00000014]`}
    style={{
      gap: "10px",
      backgroundColor: utils.colorSelector("c200"),
    }}
    onClick={onClick}
    {...containerProps}
  >
    <p
      className="font-normal font-[500] text-base leading-6"
      style={{
        color: utils.colorSelector("p700"),
      }}
    >
      {itemText}
    </p>
    <div>
      <img
        className="min-h-3.5 min-w-3 left-1.25 top-4.5 rounded-none"
        src={ArrowForwardIcon}
        alt={"forward action icon"}
      />
    </div>
  </div>
);

export default ItemCardWithAction;
