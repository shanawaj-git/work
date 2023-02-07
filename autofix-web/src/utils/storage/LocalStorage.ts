import { webStorage } from "./WebStorage";
interface LocalStorageReturnType {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => boolean;
  removeItem: (key: string) => void;
}
export const localStorage = (): LocalStorageReturnType => {
  const storage = "local";
  const { getItem, setItem, removeItem } = webStorage();
  return {
    getItem: (key: string) => getItem(key, storage),
    setItem: (key: string, value: string) => setItem(key, value, storage),
    removeItem: (key: string) => removeItem(key, storage),
  };
};
