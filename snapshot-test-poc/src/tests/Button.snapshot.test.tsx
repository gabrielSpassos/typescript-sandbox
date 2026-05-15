import React from "react";

import { render, screen } from "@testing-library/react";

import { Button } from "../components/Button";
import { colors } from "../design-system/colors";

describe("Button snapshot contract", () => {

  it("should match component snapshot", () => {

    const { container } = render(
      <Button>Save</Button>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should respect design system blue color", () => {

    render(<Button>Save</Button>);

    const button = screen.getByRole("button", {
      name: "Save"
    });

    expect(button).toHaveStyle(`
      background-color: ${colors.primaryBlue};
    `);
  });
});