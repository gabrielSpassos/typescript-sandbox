import styled, { css } from "styled-components";

import { colors } from "../design-system/colors";

type Variant =
  | "primary"
  | "danger"
  | "secondary";

interface ButtonProps {
  variant?: Variant;
}

const variants = {
  primary: css`
    background-color: ${colors.primaryBlue};
    color: ${colors.white};
  `,

  danger: css`
    background-color: ${colors.dangerRed};
    color: ${colors.white};
  `,

  secondary: css`
    background-color: ${colors.gray200};
    color: ${colors.black};
  `
};

export const Button = styled.button<ButtonProps>`
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  ${({ variant = "primary" }) => variants[variant]}
`;