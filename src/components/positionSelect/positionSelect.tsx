import { useEffect, useRef } from "react";

import { SearchablePosition } from "../../types/searchablePositions";
import { translationConstants } from "../../i18n/en-us";
import { useKey } from "../../hooks/useKey";

const DEFAULT_POSITION = "qb";

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

  function clearSearchAndFocus() {
    setSearchTerm("");
    focusSearchBox();
  }

  function focusSearchBox() {
    searchBox.current?.focus();
  }

  function updatePosition(position: string = DEFAULT_POSITION) {
    setPosition(position);
    clearSearchAndFocus();
  }

  // focus on initial page load
  useEffect(() => {
    focusSearchBox();
  }, []);

  useKey("Escape", function () {
    clearSearchAndFocus();
  });

  return (
    <search>
      <form>
        <fieldset>
          <legend>{translationConstants.positionSelect.findPlayers}</legend>
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
          <label htmlFor="search">
            {translationConstants.positionSelect.search}
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchBox}
          />
          <button type="reset" onClick={() => updatePosition()}>
            {translationConstants.positionSelect.resetSearch}
          </button>
        </fieldset>
      </form>
    </search>
  );
}
