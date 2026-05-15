import React from "react";

import { render } from "@testing-library/react";

import { ThemeProvider } from "styled-components";

import { theme } from "../design-system/theme";

interface RenderOptions {
  themeOverride?: object;
}

export function renderWithTheme(
  ui: React.ReactElement,
  options?: RenderOptions
) {

  const selectedTheme =
    options?.themeOverride || theme;

  return render(
    <ThemeProvider theme={selectedTheme}>
      {ui}
    </ThemeProvider>
  );
}