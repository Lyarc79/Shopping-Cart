import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import App from "./App.jsx";
import Shop from "./pages/Shop.jsx";
import Home from "./pages/Home.jsx";

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

test("adding an item updates the navbar badge", async () => {
  const routes = [
    {
      path: "/",
      element: <App />,
      children: [{ path: "shop", element: <Shop /> }],
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/shop"],
  });
  render(<RouterProvider router={router} />);
  const addButton = await screen.findByRole("button", { name: /add to cart/i });
  fireEvent.click(addButton);
  await waitFor(
    () => {
      const badge = screen.queryByTestId("cart-badge");
      if (!badge) throw new Error("badge not found yet");
      expect(badge).toHaveTextContent("1");
    },
    { timeout: 4000 },
  );
});

test("Shop Now Button on home page navigates to shop", async () => {
  const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
      ],
    },
  ];
  const router = createMemoryRouter(routes, { initialEntries: ["/"] });
  render(<RouterProvider router={router} />);
  const shopNowBtn = screen.getByRole("link", { name: /shop now/i });
  fireEvent.click(shopNowBtn);
  const addButtons = await screen.findAllByRole("button", {
    name: /add to cart/i,
  });
  expect(addButtons.length).toBeGreaterThan(0);
});
