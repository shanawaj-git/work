import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import Typography, { TypographyType } from 'atoms/Typography';
import ScrollableMenuItem from './ScrollableMenuItem';
import useDrag from './useDrag';
import './styles.css';

const HorizontalScrollMenu = ({
  items,
  titleProps = { typographyType: TypographyType.TITLE_1 },
  containerProps,
  scrollMenuComponentProps,
  centerLineProps,
  menuItemProps,
  menuItemTitleProps,
  defaultMenuStickColor,
  selectedMenuStickColor,
  subTitle,
  subTitleProps,
  selectedValue,
  setSelectedValue,
  minorItemsNumber,
}) => {
  const centerLineRef = useRef(null);
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleItemClick = itemId => ({ getItemById, scrollToItem }) => {
    if (dragging) {
      return;
    }
    setSelectedValue(itemId);
    scrollToItem(getItemById(itemId), 'smooth', 'center', 'nearest');
  };

  const handleDrag = ({ scrollContainer }) => event =>
    dragMove(event, posDiff => {
      if (scrollContainer.current) {
        // eslint-disable-next-line no-param-reassign
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  const findClosestElement = () => {
    const { left } = centerLineRef.current.getBoundingClientRect();
    const allWithClass = Array.from(
      document.getElementsByClassName('react-horizontal-scrolling-menu--item'),
    );
    let closestElement = allWithClass[0];
    let distance = Math.abs(left - closestElement.getBoundingClientRect().left);
    allWithClass.forEach(item => {
      const leftDistance = item.getBoundingClientRect().left;
      if (distance > Math.abs(left - leftDistance)) {
        closestElement = item;
        distance = Math.abs(left - leftDistance);
      }
    });
    return closestElement;
  };

  const setClosestToCenterValue = () => {
    const closestElement = findClosestElement();
    setSelectedValue(closestElement.getAttribute('data-key'));
  };

  function onWheel(_, event) {
    const isThouchpad =
      Math.abs(event.deltaX) !== 0 || Math.abs(event.deltaY) < 15;
    if (isThouchpad) {
      event.stopPropagation();
    }
    setClosestToCenterValue();
  }

  const onInit = ({ getItemById, scrollToItem }) => {
    scrollToItem(getItemById(items[0].id), 'smooth', 'center');
  };
  const onMouseUp = () => () => {
    dragStop();
    setClosestToCenterValue();
  };
  const onMouseDown = () => dragStart;
  return (
    <>
      <div
        data-testid="horizontal-scroll-menu-component"
        className="my-10"
        {...scrollMenuComponentProps}
      >
        {selectedValue && (
          <Typography
            data-testid="horizontal-scroll-menu-title"
            className="text-center !text-[54px] font-medium !mb-[20px]"
            {...titleProps}
          >
            {selectedValue}
          </Typography>
        )}
        {subTitle && (
          <Typography
            className="text-center !text-[15px] font-thin !mb-[20px]"
            data-testid="horizontal-scroll-menu-sub-title"
            {...subTitleProps}
          >
            {subTitle}
          </Typography>
        )}
        <div data-testid="horizontal-scroll-menu-container" {...containerProps}>
          <div
            data-testid="horizontal-scroll-menu-center-line"
            className="relative top-0 left-1/2 w-[2px] h-[100px] mb-[-100px] bg-transparent"
            {...centerLineProps}
            ref={centerLineRef}
          />
          <ScrollMenu
            onInit={onInit}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            options={{ throttle: 0 }}
            onMouseMove={handleDrag}
            onScroll={setClosestToCenterValue}
          >
            {items.map(({ id }, index) => (
              <ScrollableMenuItem
                index={index}
                itemId={id}
                key={id}
                onClick={handleItemClick(id)}
                selected={id === selectedValue}
                menuItemProps={menuItemProps}
                menuItemTitleProps={menuItemTitleProps}
                defaultMenuStickColor={defaultMenuStickColor}
                selectedMenuStickColor={selectedMenuStickColor}
                minorItemsNumber={minorItemsNumber}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
};
HorizontalScrollMenu.propTypes = {
  items: PropTypes.array,
  titleProps: PropTypes.object,
  containerProps: PropTypes.object,
  scrollMenuComponentProps: PropTypes.object,
  centerLineProps: PropTypes.object,
  menuItemProps: PropTypes.object,
  menuItemTitleProps: PropTypes.object,
  defaultMenuStickColor: PropTypes.string,
  selectedMenuStickColor: PropTypes.string,
  subTitle: PropTypes.string,
  subTitleProps: PropTypes.object,
  selectedValue: PropTypes.string,
  setSelectedValue: PropTypes.func,
  minorItemsNumber: PropTypes.number,
};
export default HorizontalScrollMenu;
