import { useEffect, useState } from "react";
import { Player } from "../../types/player";
import { usePosition } from "../../hooks/usePosition";
// import { useLocalStorageState } from "../../hooks/useLocalStorageState";

interface PlayersProps {
  position: string;
  searchTerm: string;
}

export default function PlayerList({ position, searchTerm }: PlayersProps) {
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  //   const [drafted, setDrafted] = useLocalStorageState([]);
  const { players, loading, error } = usePosition(position);

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
              <li key={player.name}>
                {player?.rank}). {player?.name}
              </li>
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
