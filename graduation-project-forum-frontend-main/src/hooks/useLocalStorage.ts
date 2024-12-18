import { useState } from "react";

export const useLocalStorage = (keyName: string, defaultValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.log(err);
      return defaultValue;
    }
  });
  const setValue = (newValue: unknown) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  const removeItem = (keyName: string) => {
    try {
      window.localStorage.removeItem(keyName);
    } catch (err) {
      console.log(err);
    }
  };
  return [storedValue, setValue, removeItem];
};
