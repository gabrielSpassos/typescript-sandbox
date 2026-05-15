import styled from "styled-components";
import { colors } from "../design-system/colors";

export const Button = styled.button`
  background-color: ${colors.primaryBlue};
  color: ${colors.white};

  border: none;
  padding: 12px 20px;
  border-radius: 8px;

  font-size: 16px;
  cursor: pointer;
`;