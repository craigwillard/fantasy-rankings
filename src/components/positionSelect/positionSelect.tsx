import { SearchablePosition } from "../../types/searchablePositions";

interface PositionSelectProps {
  labelText: string;
  position: string;
  setPosition: Function;
  searchTerm: string;
  setSearchTerm: Function;
  searchablePositions: SearchablePosition[];
}

export function PositionSelect({
  labelText,
  position,
  setPosition,
  searchTerm,
  setSearchTerm,
  searchablePositions,
}: PositionSelectProps) {
  function updatePosition(position: string) {
    setPosition(position);
    setSearchTerm("");
  }
  return (
    <form>
      <fieldset>
        <label htmlFor="position">{labelText}</label>
        <select
          id="position"
          name="position"
          value={position}
          onChange={(e) => updatePosition(e.target.value)}
        >
          {searchablePositions.map((position: any) => (
            <option value={position.value} key={position.value}>
              {position.name}
            </option>
          ))}
        </select>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </fieldset>
    </form>
  );
}
