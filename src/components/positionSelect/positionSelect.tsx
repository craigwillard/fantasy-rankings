// import { useEffect, useRef } from "react";
import { SearchablePosition } from "../../types/searchablePositions";

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
  //   const searchBox = useRef<HTMLInputElement>(null);

  //   useEffect(() => {
  //     function callback(e: KeyboardEvent) {
  //       if (e.code === "Escape") {
  //         setSearchTerm("");
  //       }
  //       searchBox.current?.focus();
  //     }

  //     document.addEventListener("keydown", callback);

  //     return () => {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   }, [setSearchTerm]);
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
          //   ref={searchBox}
        />
      </fieldset>
    </form>
  );
}
