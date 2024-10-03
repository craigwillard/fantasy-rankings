import "./App.scss";

import { useReducer } from "react";
import Header from "./components/header/header";
import PlayerList from "./components/playerList/playerList";
import PositionSelect from "./components/positionSelect/positionSelect";
import { searchablePositions } from "./data/searchablePositions";

type AppState = {
  position: string;
  searchTerm: string;
  mode: string;
};

function reducer(state: AppState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case "updatePosition":
      return { ...state, position: payload };
    case "updateSearchTerm":
      return { ...state, searchTerm: payload };
    case "updateMode":
      return { ...state, mode: payload };
    default:
      throw new Error("No action provided");
  }
}

const initialState: AppState = {
  position: "qb",
  searchTerm: "",
  mode: "light",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { position, searchTerm, mode } = state;

  const updatePosition = function (position: string) {
    dispatch({ type: "updatePosition", payload: position });
  };

  const updateSearchTerm = function (searchTerm: string) {
    dispatch({ type: "updateSearchTerm", payload: searchTerm });
  };

  const updateMode = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "updateMode",
      payload: e.target.checked ? "dark" : "light",
    });
  };

  return (
    <div className={`outer ${mode}`}>
      <div className="inner">
        {/* TODO: configure multiple sports */}
        <Header>
          <h1 className="heading">Fantasy Rankings</h1>
          <label htmlFor="mode">Dark mode</label>
          <input
            id="mode"
            type="checkbox"
            value={mode}
            checked={mode === "dark"}
            onChange={updateMode}
          />
        </Header>
        <nav>
          <PositionSelect
            labelText="Position"
            searchablePositions={searchablePositions}
            position={position}
            setPosition={(position: string) => updatePosition(position)}
            searchTerm={searchTerm}
            setSearchTerm={(searchTerm: string) => updateSearchTerm(searchTerm)}
          />
        </nav>
        <main>
          <PlayerList position={position} searchTerm={searchTerm} />
        </main>
      </div>
    </div>
  );
}

export default App;
