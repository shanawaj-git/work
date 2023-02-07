import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { act } from 'react-test-renderer';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import SwipeableView from '../index';
describe('Carousel', () => {
  it('Should import succesfully with default content', () => {
    const { container } = render(<SwipeableView />);
    expect(container).toBeTruthy();
  });
  it('renders correctly and match the snapshot with default variant', () => {
    const { container } = render(<SwipeableView />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly and match the snapshot with progress variant', () => {
    const { container } = render(<SwipeableView variant="progress" />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly and match the snapshot with custom next icon', () => {
    const { container } = render(
      <SwipeableView nextIcon={<ArrowRightAltIcon />} />,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders correctly and match the snapshot with custom back icon', () => {
    const { container } = render(
      <SwipeableView backIcon={<ChevronLeftIcon />} />,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders correctly with custom content', () => {
    act(() => {
      render(
        <SwipeableView
          variant="progress"
          content={[
            <div data-testid="slid01">slider-01</div>,
            <div>slider-02</div>,
            <div>slider-03</div>,
          ]}
        />,
      );
    });
    const firstSlider = document.querySelector('[data-testid="slid01"]');
    expect(firstSlider.textContent).toBe('slider-01');
  });
  it('renders correctly with next button', () => {
    act(() => {
      render(
        <SwipeableView
          variant="progress"
          content={[
            <div data-testid="slid01">slider-01</div>,
            <div data-testid="slid02">slider-02</div>,
            <div data-testid="slid03">slider-03</div>,
          ]}
          nextButton
        />,
      );
    });
    const nextbtn = document.querySelector('[type="button"]');
    expect(nextbtn).toBeTruthy();
  });
  it('renders correctly with back button', () => {
    act(() => {
      render(
        <SwipeableView
          variant="progress"
          content={[
            <div data-testid="slid01">slider-01</div>,
            <div data-testid="slid02">slider-02</div>,
            <div data-testid="slid03">slider-03</div>,
          ]}
          backButton
        />,
      );
    });
    const nextbtn = document.querySelector('[type="button"]');
    expect(nextbtn).toBeTruthy();
  });
  it('renders correctly with both buttons', () => {
    act(() => {
      render(<SwipeableView variant="progress" backButton nextButton />);
    });
    const btns = document.querySelectorAll('[type="button"]').length;
    expect(btns).toBe(2);
  });
  it('display slider one as a first layer', () => {
    act(() => {
      render(
        <SwipeableView
          variant="progress"
          nextButton
          content={[
            <div data-testid="slid01">slider-01</div>,
            <div data-testid="slid02">slider-02</div>,
            <div data-testid="slid03">slider-03</div>,
          ]}
          maxSteps={3}
        />,
      );
    });
    const activerSlider = document.querySelector('[aria-hidden="false"]');
    expect(activerSlider.textContent).toBe('slider-01');
  });
  it('display slider two after click on nextButton', () => {
    const tree = render(
      <SwipeableView
        variant="progress"
        nextButton
        content={[
          <div data-testid="slid01">slider-01</div>,
          <div data-testid="slid02">slider-02</div>,
          <div data-testid="slid03">slider-03</div>,
        ]}
        maxSteps={3}
      />,
    );
    const btn = document.querySelector('[type="button"]');
    fireEvent.click(btn);
    tree.rerender(
      <SwipeableView
        variant="progress"
        nextButton
        content={[
          <div data-testid="slid01">slider-01</div>,
          <div data-testid="slid02">slider-02</div>,
          <div data-testid="slid03">slider-03</div>,
        ]}
        maxSteps={3}
      />,
    );
    const activerSlider = document.querySelector('[aria-hidden="false"]');
    expect(activerSlider.textContent).toBe('slider-02');
  });
  it('display slider two after click on nextButton two times and backButton one time', () => {
    const tree = render(
      <SwipeableView
        variant="progress"
        nextButton
        content={[
          <div data-testid="slid01">slider-01</div>,
          <div data-testid="slid02">slider-02</div>,
          <div data-testid="slid03">slider-03</div>,
        ]}
        maxSteps={3}
      />,
    );
    const nextBtn = document.querySelector('[type="button"]');
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);

    tree.rerender(
      <SwipeableView
        variant="progress"
        backButton
        content={[
          <div data-testid="slid01">slider-01</div>,
          <div data-testid="slid02">slider-02</div>,
          <div data-testid="slid03">slider-03</div>,
        ]}
        maxSteps={3}
      />,
    );
    const backBtn = document.querySelector('[type="button"]');
    fireEvent.click(backBtn);
    tree.rerender(
      <SwipeableView
        variant="progress"
        backButton
        content={[
          <div data-testid="slid01">slider-01</div>,
          <div data-testid="slid02">slider-02</div>,
          <div data-testid="slid03">slider-03</div>,
        ]}
        maxSteps={3}
      />,
    );
    const activerSlider = document.querySelector('[aria-hidden="false"]');
    expect(activerSlider.textContent).toBe('slider-02');
  });

  it('triggers "onIndexChanged" with value "0" on first render', async () => {
    const onIndexChangedMockCallback = jest.fn();

    render(
      <SwipeableView
        variant="progress"
        nextButton
        content={[
          <div data-testid="slid01">slider-01</div>,
          <div data-testid="slid02">slider-02</div>,
          <div data-testid="slid03">slider-03</div>,
        ]}
        maxSteps={3}
        onIndexChanged={onIndexChangedMockCallback}
      />,
    );

    await wait(onIndexChangedMockCallback);
    expect(onIndexChangedMockCallback.mock.calls[0][0]).toBe(0);
  });

  it('triggers "onIndexChanged" with value "1" on nextClick', () => {
    const onIndexChangedMockCallback = jest.fn();

    const tree = render(
      <SwipeableView
        variant="progress"
        nextButton
        content={[
          <div data-testid="slid01">slider-01</div>,
          <div data-testid="slid02">slider-02</div>,
          <div data-testid="slid03">slider-03</div>,
        ]}
        maxSteps={3}
        onIndexChanged={onIndexChangedMockCallback}
      />,
    );
    const btn = tree.getByTestId('next-btn');
    fireEvent.click(btn);

    tree.rerender(
      <SwipeableView
        variant="progress"
        nextButton
        content={[
          <div data-testid="slid01">slider-01</div>,
          <div data-testid="slid02">slider-02</div>,
          <div data-testid="slid03">slider-03</div>,
        ]}
        maxSteps={3}
        onIndexChanged={onIndexChangedMockCallback}
      />,
    );

    expect(onIndexChangedMockCallback.mock.calls[1][0]).toBe(1);
  });
});
