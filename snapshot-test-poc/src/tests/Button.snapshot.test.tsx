import React from "react";
import renderer from "react-test-renderer";

import { Button } from "../components/Button";
import { colors } from "../design-system/colors";

describe("Button snapshot contract", () => {

  it("should match component snapshot", () => {

    const tree = renderer
      .create(<Button>Save</Button>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should respect design system blue color", () => {

    const tree = renderer
      .create(<Button>Save</Button>)
      .toJSON();

    expect(tree).toHaveStyleRule(
      "background-color",
      colors.primaryBlue
    );
  });
});
