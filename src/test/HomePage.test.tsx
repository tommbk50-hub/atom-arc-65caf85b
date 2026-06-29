import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import HomePage from "@/pages/HomePage";

describe("HomePage", () => {
  it("renders featured research content", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Featured Research" })).toBeInTheDocument();
  });
});
