
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // ✅ adds toBeInTheDocument
import { InputField } from "./InputField"


test("renders input with label", () => {
  render(<InputField label="Username" placeholder="Enter username" />);
  expect(screen.getByLabelText("Username")).toBeInTheDocument(); // ✅ works
});

test("calls onChange when typing", () => {
  const handleChange = jest.fn();
  render(<InputField label="Email" onChange={handleChange} />);
  
  const input = screen.getByLabelText("Email");
  fireEvent.change(input, { target: { value: "test" } });

  expect(handleChange).toHaveBeenCalled(); // ✅ works
});
