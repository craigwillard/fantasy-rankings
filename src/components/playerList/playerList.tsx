import { useEffect, useState } from "react";

import "./playerList.scss";
import { Player } from "../../types/player";
import { translationConstants } from "../../i18n/en-us";
import { usePosition } from "../../hooks/usePosition";
import { PlayersProps } from "./playerList.types";

export default function PlayerList({ position, searchTerm }: PlayersProps) {
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  const { players, loading, error, setPlayers } = usePosition(position);

  function draftPlayer(name: string) {
    setPlayers((players: Player[]) =>
      players.map((player: Player) =>
        player.name === name ? { ...player, drafted: !player.drafted } : player
      )
    );
  }

  useEffect(
    function () {
      setFilteredPlayers(
        players.filter(
          (player: Player) =>
            player.name.toLowerCase().search(searchTerm.toLowerCase()) >= 0
        )
      );
    },
    [players, searchTerm]
  );
  return (
    <>
      <h2>
        {translationConstants.playerList.labelPosition}:{" "}
        {position.toUpperCase()}
      </h2>
      {!loading && !error && (
        <>
          <h3>
            {translationConstants.playerList.labelPlayers}{" "}
            {searchTerm ? `containing ${searchTerm}` : ""} (
            {filteredPlayers.length})
          </h3>
          <ul className="players">
            {filteredPlayers.map((player: any) => (
              <li key={player.name}>
                <input
                  id={`player-${player.rank}`}
                  type="checkbox"
                  checked={player.drafted}
                  onChange={() => draftPlayer(player.name)}
                />
                <label
                  htmlFor={`player-${player.rank}`}
                  className={player.drafted ? "drafted" : ""}
                >
                  {player.rank}. {player.name}
                </label>
              </li>
            ))}
          </ul>
        </>
      )}
      {loading && (
        <>
          <h3>{translationConstants.global.loading}</h3>
        </>
      )}
      {error && <h3>{error}</h3>}
    </>
  );
}
