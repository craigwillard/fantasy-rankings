import "./App.css";

import { useState } from "react";
import { Header } from "./components/header/header";
import { PlayerList } from "./components/playerList/playerList";
import { PositionSelect } from "./components/positionSelect/positionSelect";
import { searchablePositions } from "./data/searchablePositions";

function App() {
  const [position, setPosition] = useState("qb");

  return (
    <div className="App">
      <Header title="Fantasy Rankings" />
      <nav>
        <PositionSelect
          labelText="Position"
          searchablePositions={searchablePositions}
          position={position}
          setPosition={setPosition}
        />
      </nav>
      <main>
        <PlayerList position={position} />
      </main>
    </div>
  );
}

export default App;
