import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import CartItem from "./CartItem";

const mockItem = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  quantity: 2,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
};

test("should show the rendered item", () => {
  render(<CartItem item={mockItem} />);
  const titleElement = screen.getByText(/foldsack/i);
  expect(titleElement).toBeInTheDocument();
  const priceElement = screen.getByText(/109.95/);
  expect(priceElement).toBeInTheDocument();
  const immgElement = screen.getByAltText(mockItem.title);
  expect(immgElement).toBeInTheDocument();
  const totalElement = screen.getByText(/219.90/);
  expect(totalElement).toBeInTheDocument();
  const quantityInput = screen.getByDisplayValue("2");
  expect(quantityInput).toBeInTheDocument();
});

test("should call onUpdate with quantity 3 when plus button is clicked", () => {
  const onUpdateMock = vi.fn();
  render(<CartItem item={mockItem} onUpdate={onUpdateMock} />);
  const plusButton = screen.getByText("+");
  fireEvent.click(plusButton);
  expect(onUpdateMock).toHaveBeenCalledWith(1, 3);
});

test("minus button should be disabled when quantity is 1", () => {
  const itemAtOne = { ...mockItem, quantity: 1 };
  render(<CartItem item={itemAtOne} />);
  const minusButton = screen.getByText("-");
  expect(minusButton).toBeDisabled();
});
