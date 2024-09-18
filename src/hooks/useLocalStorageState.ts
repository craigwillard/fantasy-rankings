import { useEffect, useState } from "react";
import { Player } from "../types/player";

export function useLocalStorageState(initialState: Player[], key: string) {
  const [value, setValue] = useState(function () {
    const storedValue: string = localStorage.getItem(key) || "";
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
