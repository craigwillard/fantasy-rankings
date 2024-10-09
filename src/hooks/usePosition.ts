import { useEffect, useState } from "react";
import { DataService } from "../services/data.service";
import { useLocalStorageState } from "./useLocalStorageState";

export function usePosition(position: string) {
  const [players, setPlayers] = useLocalStorageState([], position);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  console.log(players);

  useEffect(
    function () {
      async function fetchPosition(position: string) {
        try {
          setLoading(true);
          setError("");
          const response = await DataService.getQBs(position);
          if (!response?.ok) {
            throw new Error(
              `Something went wrong with fetching ${position.toUpperCase()}s.`
            );
          }
          console.log(response);
          const players = await response.json();
          setPlayers(players);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(String(error));
          }
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      if (players.length > 0) {
        setPlayers(players);
      } else {
        fetchPosition(position);
      }
    },
    [position, setLoading, setError, players, setPlayers]
  );

  return {
    players,
    loading,
    error,
    setPlayers,
  };
}
