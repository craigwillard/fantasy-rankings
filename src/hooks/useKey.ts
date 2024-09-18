import { useEffect } from "react";

export function useKey(keyCode: string, action: Function) {
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        action();
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, keyCode]);
}
