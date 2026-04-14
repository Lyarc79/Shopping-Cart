import { render, screen } from "@testing-library/react";
import {
  BrowserRouter,
  MemoryRouter,
  RouterProvider,
  useOutletContext,
} from "react-router-dom";
import { expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import App from "../App.jsx";
import Shop from "./Shop.jsx";

vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, title: "Test Product", price: 10, image: "" },
        ]),
    }),
  ),
);

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

test("Shop page renders items and allows clicking add", async () => {
  const handleAddToCart = vi.fn();
  vi.mocked(useOutletContext).mockReturnValue({ handleAddToCart });
  render(
    <MemoryRouter>
      <Shop />
    </MemoryRouter>,
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  const product = await screen.findByText(/Test Product/i);
  expect(product).toBeInTheDocument();
  const addButton = screen.getByRole("button", { name: /add to cart/i });
  expect(addButton).toBeInTheDocument();
});
