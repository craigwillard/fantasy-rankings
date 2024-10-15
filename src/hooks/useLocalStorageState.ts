import { useEffect, useState } from "react";

import { Player } from "../types/player";

type LocalStorageValue = string | Player[];

export function useLocalStorageState(
  initialState: LocalStorageValue,
  key: string
) {
  const [value, setValue] = useState(function () {
    const storedValue: LocalStorageValue = localStorage.getItem(key) || "";
    // console.log(storedValue);
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
