import store from "@/features/index";
import {
  decrement,
  getValue,
  increment,
  incrementByAmount,
} from "@/features/counter";

const [ZERO, ONE, TWO, FIVE] = [0, 1, 2, 5];

describe("Testing Slice and Actions and States", () => {
  it("Should increment when execution", () => {
    expect(getState()).toBe(ZERO);
    store.dispatch(increment());
    expect(getState()).toBe(ONE);
    store.dispatch(decrement());
    expect(getState()).toBe(ZERO);
    store.dispatch(incrementByAmount(TWO));
    expect(getState()).toBe(TWO);
  });
  it("Should return Value ", () => {
    const value = {
      counter: { value: FIVE },
    };
    getValue(value);

    expect(getValue(value)).toBe(FIVE);
  });
});

const getState = (): number => {
  const state = store.getState();
  const {
    counter: { value },
  } = state;
  return value;
};
