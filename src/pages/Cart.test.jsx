import { render, screen } from "@testing-library/react";
import { useOutletContext } from "react-router-dom";
import { expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import Cart from "./Cart";

const mockCartItems = [
  { id: 1, title: "Blue Shirt", price: 10, quantity: 2, image: "" },
  { id: 2, title: "Red Hat", price: 5, quantity: 1, image: "" },
];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

test("should calculate the grand total correctly", () => {
  vi.mocked(useOutletContext).mockReturnValue({
    cartItem: mockCartItems,
    handleUpdateQuantity: vi.fn(),
    handleRemoveFromCart: vi.fn(),
  });
  render(<Cart />);
  const grandTotal = screen.getByText(/25.00/);
  expect(grandTotal).toBeInTheDocument();
});

test("should show empty message when cart is empty", () => {
  vi.mocked(useOutletContext).mockReturnValue({
    cartItem: [],
    handleUpdateQuantity: vi.fn(),
    handleRemoveFromCart: vi.fn(),
  });
  render(<Cart />);
  const emptyMessage = screen.getByText(/your cart is empty!/i);
  screen.debug();
  expect(emptyMessage).toBeInTheDocument();
});
