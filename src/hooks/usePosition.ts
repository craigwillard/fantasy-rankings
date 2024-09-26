import { useEffect, useState } from "react";
import { DataService } from "../services/data.service";
import { Player } from "../types/player";

export function usePosition(position: string) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(
    function () {
      async function getQuarterbacks(position: string) {
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
      getQuarterbacks(position);
    },
    [position, setLoading, setError]
  );

  return {
    players,
    loading,
    error,
    setPlayers,
  };
}
