import "./playerList.scss";

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
  const { players, loading, error, setPlayers } = usePosition(position);

  function draftPlayer(name: string) {
    setPlayers((players) =>
      players.map((player) =>
        player.name === name ? { ...player, drafted: !player.drafted } : player
      )
    );
  }

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
          <ul className="players">
            {filteredPlayers.map((player: any) => (
              <li key={player.name}>
                <input
                  id={`player-${player.rank}`}
                  type="checkbox"
                  value={player.drafted}
                  onChange={() => draftPlayer(player.name)}
                />
                <label
                  htmlFor={`player-${player.rank}`}
                  className={player?.drafted ? "drafted" : ""}
                >
                  {player?.rank}. {player?.name}
                </label>
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
