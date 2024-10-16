import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header text", () => {
  // arrange
  render(<App />);

  // act
  const headerElement = screen.getByText(/Fantasy Rankings/i);

  // assert
  expect(headerElement).toBeInTheDocument();
});
