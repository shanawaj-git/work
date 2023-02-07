// util to push bottom nav/button up when keyboard pops up for
// Safari on IOS

const TRANSITION_DURATION_IN_SECONDS = 0.3;
let pendingUpdate = false;

type ViewPortHandlerFunc = (selector: string) => (event: any) => void;

export const viewPortHandler: ViewPortHandlerFunc = selector => {
  return (event: any): void => {
    pendingUpdate = true;
    requestAnimationFrame(() => {
      pendingUpdate = false;
      const layoutViewport = document.getElementById('app');

      const viewport = event.target;
      const offsetLeft = viewport.offsetLeft;
      const offsetTop =
        viewport.height -
        layoutViewport.getBoundingClientRect().height +
        viewport.offsetTop;
      const elementToBeMovedUp = document.querySelector<HTMLElement>(selector);
      const transition = `translate(${offsetLeft}px,${offsetTop}px) scale(${1 /
        viewport.scale})`;

      elementToBeMovedUp.style.transform = transition;
      elementToBeMovedUp.style[
        '-webkit-transition'
      ] = `${TRANSITION_DURATION_IN_SECONDS}s ease-in-out`;
    });
  };
};
