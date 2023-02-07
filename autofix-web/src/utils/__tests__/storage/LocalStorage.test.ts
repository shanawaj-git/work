import { localStorage } from "@/utils/storage/LocalStorage";
describe("LocalStorage", () => {
  const { getItem, setItem, removeItem } = localStorage();
  test("should able to store and retrieve key value pair", () => {
    setItem("test", "value");
    expect(window.localStorage.getItem("test")).toBe(getItem("test"));
  });
  test("should able to remove item using key", () => {
    removeItem("test");
    expect(getItem("test")).toBe(undefined);
  });
});
