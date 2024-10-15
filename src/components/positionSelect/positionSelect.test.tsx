import { render, screen } from "@testing-library/react";

import { searchablePositions } from "../../data/searchablePositions";
import PositionSelect from "./positionSelect";

test("renders position select", () => {
  // arrange
  const labelText = "Position";
  const setPosition = (position: string) => {};

  render(
    <PositionSelect
      labelText={labelText}
      position="qb"
      setPosition={setPosition}
      searchablePositions={searchablePositions}
      searchTerm=""
      setSearchTerm={() => {}}
    />
  );

  // act
  const labelElement = screen.getByLabelText(labelText);

  // assert
  expect(labelElement).toBeInTheDocument();
});
