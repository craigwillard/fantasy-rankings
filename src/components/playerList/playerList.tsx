import { useEffect, useState } from "react";
import { DataService } from "../../services/data.service";

interface PlayersProps {
  position: string;
  loading: boolean;
  handleLoading: Function;
  error: string;
  setError: Function;
}

export function PlayerList({
  position,
  loading,
  handleLoading,
  error,
  setError,
}: PlayersProps) {
  const [players, setPlayers] = useState([]);
  useEffect(
    function () {
      async function getQuarterbacks(position: string) {
        try {
          handleLoading(true);
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
          handleLoading(false);
        }
      }
      getQuarterbacks(position);
    },
    [position, handleLoading, setError]
  );
  return (
    <>
      <h2>Position: {position.toUpperCase()}</h2>
      {!loading && !error && (
        <>
          <h3>Players ({players.length})</h3>
          <ul>
            {players.map((player: any) => (
              <li key={player.name}>{player?.name}</li>
            ))}
          </ul>
        </>
      )}
      {loading && (
        <>
          <h3>LOADING...</h3>
        </>
      )}
      {error && <h3>{error}</h3>}
    </>
  );
}
