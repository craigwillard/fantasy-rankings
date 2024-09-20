import "./App.scss";

import { createContext, useState } from "react";
import Header from "./components/header/header";
import PlayerList from "./components/playerList/playerList";
import PositionSelect from "./components/positionSelect/positionSelect";
import { searchablePositions } from "./data/searchablePositions";

const ModeContext = createContext<string>("");

function App() {
  const [position, setPosition] = useState<string>("qb");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mode, setMode] = useState<string>("light");

  return (
    <ModeContext.Provider value={mode}>
      <div className={`outer ${mode}`}>
        <div className="inner">
          <Header>
            <h1 className="heading">Fantasy Rankings</h1>
            <label htmlFor="mode">Dark mode</label>
            <input
              id="mode"
              type="checkbox"
              value={mode}
              checked={mode === "dark"}
              onChange={(e) => setMode(e.target.checked ? "dark" : "light")}
            />
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
      </div>
    </ModeContext.Provider>
  );
}

export default App;
