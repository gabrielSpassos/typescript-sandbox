import React from "react";

import { render, screen } from "@testing-library/react";

import { Button } from "../components/Button";

import { colors } from "../design-system/colors";

import { renderWithTheme } from "./test-utils";

import { darkTheme } from "../design-system/dark-theme";

describe("Button snapshot contract", () => {

  it("should match primary snapshot", () => {

    const { container } = render(
      <Button variant="primary">
        Save
      </Button>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match danger snapshot", () => {

    const { container } = render(
      <Button variant="danger">
        Delete
      </Button>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should respect primary design token", () => {

    render(
      <Button variant="primary">
        Save
      </Button>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveStyle(`
      background-color: ${colors.primaryBlue};
    `);
  });

  it("should respect danger design token", () => {

    render(
      <Button variant="danger">
        Delete
      </Button>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveStyle(`
      background-color: ${colors.dangerRed};
    `);
  });

  it("should respect primary design token", () => {

    renderWithTheme(
      <Button variant="primary">
        Save
      </Button>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveStyle(`
      background-color: ${colors.primaryBlue};
    `);
  });

  it("should match dark mode snapshot", () => {

    const { container } = renderWithTheme(
      <Button variant="primary">
        Save
      </Button>,
      {
        themeOverride: darkTheme
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});