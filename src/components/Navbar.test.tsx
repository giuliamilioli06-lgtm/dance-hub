import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";

function CurrentPath() {
  const { pathname } = useLocation();
  return <output>{pathname}</output>;
}

describe("Navbar route history controls", () => {
  it("navigates backward and forward through routes visited in the app", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
        <CurrentPath />
      </MemoryRouter>,
    );

    const backButton = screen.getByRole("button", {
      name: "Torna alla pagina precedente",
    });
    const forwardButton = screen.getByRole("button", {
      name: "Vai alla pagina successiva",
    });

    expect(backButton.hasAttribute("disabled")).toBe(true);
    fireEvent.click(screen.getByRole("link", { name: "La storia" }));
    expect(screen.getByText("/storia")).toBeTruthy();
    expect(backButton.hasAttribute("disabled")).toBe(false);

    fireEvent.click(backButton);
    expect(screen.getByText("/")).toBeTruthy();
    expect(forwardButton.hasAttribute("disabled")).toBe(false);

    fireEvent.click(forwardButton);
    expect(screen.getByText("/storia")).toBeTruthy();
  });
});
