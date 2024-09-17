import { useEffect, useState } from "react";
import { DataService } from "../../services/data.service";
import { Player } from "../../types/player";

interface PlayersProps {
  position: string;
  searchTerm: string;
}

export function PlayerList({ position, searchTerm }: PlayersProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
          setFilteredPlayers(players);
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
  useEffect(
    function () {
      setFilteredPlayers(
        players.filter(
          (player) =>
            player.name.toLowerCase().search(searchTerm.toLowerCase()) >= 0
        )
      );
    },
    [players, searchTerm]
  );
  return (
    <>
      <h2>Position: {position.toUpperCase()}</h2>
      {!loading && !error && (
        <>
          <h3>
            Players {searchTerm ? `containing ${searchTerm}` : ""} (
            {filteredPlayers.length})
          </h3>
          <ul>
            {filteredPlayers.map((player: any) => (
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
