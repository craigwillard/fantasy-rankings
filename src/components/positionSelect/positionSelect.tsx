import { SearchablePosition } from "../../types/searchablePositions";

interface PositionSelectProps {
  labelText: string;
  position: string;
  setPosition: Function;
  searchablePositions: SearchablePosition[];
}

export function PositionSelect({
  labelText,
  position,
  setPosition,
  searchablePositions,
}: PositionSelectProps) {
  function handleFormSubmit() {}

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="position">{labelText}</label>
      <select
        id="position"
        name="position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      >
        {searchablePositions.map((position: any) => (
          <option value={position.value} key={position.value}>
            {position.name}
          </option>
        ))}
      </select>
    </form>
  );
}
