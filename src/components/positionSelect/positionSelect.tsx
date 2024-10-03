import { useEffect, useRef } from "react";
import { SearchablePosition } from "../../types/searchablePositions";
import { useKey } from "../../hooks/useKey";

interface PositionSelectProps {
  labelText: string;
  position: string;
  setPosition: Function;
  searchTerm: string;
  setSearchTerm: Function;
  searchablePositions: SearchablePosition[];
}

export default function PositionSelect({
  labelText,
  position,
  setPosition,
  searchTerm,
  setSearchTerm,
  searchablePositions,
}: PositionSelectProps) {
  const searchBox = useRef<HTMLInputElement>(null);

  function focusSearchBox() {
    searchBox.current?.focus();
  }

  function updatePosition(position: string) {
    setPosition(position);
    setSearchTerm("");
    focusSearchBox();
  }

  useEffect(() => {
    focusSearchBox();
  }, []);

  useKey("Escape", function () {
    setSearchTerm("");
    focusSearchBox();
  });

  return (
    <search>
      <form>
        <fieldset>
          <legend>Find fantasy players</legend>
          <label htmlFor="position">{labelText}</label>
          <select
            id="position"
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
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchBox}
          />
        </fieldset>
      </form>
    </search>
  );
}
