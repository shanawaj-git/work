import Typography, { TypographyType } from 'atoms/Typography';
import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import PropTypes from 'prop-types';
import { colorSelector } from '../../themes';
const PRIMARY_COLOR = colorSelector('c400');
const SECONDARY_COLOR = colorSelector('c400');
const ScrollableMenuItem = ({
  index,
  itemId,
  selected,
  onClick,
  onKeyDown,
  menuItemProps,
  menuItemTitleProps = {
    typographyType: TypographyType.CAPTION,
  },
  defaultMenuStickColor = SECONDARY_COLOR,
  selectedMenuStickColor = PRIMARY_COLOR,
  minorItemsNumber = 5,
}) => {
  const visibility = React.useContext(VisibilityContext);
  const itemIdDivisibleByMinorItemsNumber =
    index % (minorItemsNumber + 1) === 0;

  return (
    <>
      <div
        data-testid={`scrollable-menu-item-${itemId}`}
        onClick={() => onClick(visibility)}
        onKeyDown={() => onKeyDown && onKeyDown()}
        role="button"
        className="inline-block my-0 mx-[5px] w-[10px] "
        tabIndex={0}
        {...menuItemProps}
      >
        <div className="flex flex-col self-center justify-center justify-self-center">
          <div
            style={{
              backgroundColor: selected
                ? selectedMenuStickColor
                : defaultMenuStickColor,
            }}
            className={`${selected ? 'w-[2px]' : 'w-[1px]'} ${
              itemIdDivisibleByMinorItemsNumber
                ? 'h-[88px] mt-0'
                : 'h-[56px] mt-[16px]'
            }`}
          />
          {itemIdDivisibleByMinorItemsNumber && (
            <Typography
              className="!mt-[20px] text-sm tracking-[.3px]"
              {...menuItemTitleProps}
            >
              {itemId}
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

ScrollableMenuItem.propTypes = {
  index: PropTypes.number,
  itemId: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  menuItemProps: PropTypes.object,
  menuItemTitleProps: PropTypes.object,
  defaultMenuStickColor: PropTypes.string,
  selectedMenuStickColor: PropTypes.string,
  minorItemsNumber: PropTypes.number,
};

export default ScrollableMenuItem;
