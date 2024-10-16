import { render, screen } from "@testing-library/react";
import Header from "./header";

test("renders header text", () => {
  // arrange
  const headerText = "Cheeseburger and fries";
  render(
    <Header>
      <h1>{headerText}</h1>
    </Header>
  );

  // act
  const headerElement = screen.getByText(headerText);

  // assert
  expect(headerElement).toBeInTheDocument();
});
