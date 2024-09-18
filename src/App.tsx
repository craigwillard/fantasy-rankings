import "./App.scss";

import { useState } from "react";
import Header from "./components/header/header";
import PlayerList from "./components/playerList/playerList";
import PositionSelect from "./components/positionSelect/positionSelect";
import { searchablePositions } from "./data/searchablePositions";

function App() {
  const [position, setPosition] = useState("qb");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <Header>
        <h1 className="heading">Fantasy Rankings</h1>
      </Header>
      <nav>
        <PositionSelect
          labelText="Position"
          searchablePositions={searchablePositions}
          position={position}
          setPosition={setPosition}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </nav>
      <main>
        <PlayerList position={position} searchTerm={searchTerm} />
      </main>
    </div>
  );
}

export default App;
