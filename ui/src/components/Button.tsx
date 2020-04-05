import React from "react";
import styled, { css } from "styled-components";

const PrimaryStyle = css`
  background-color: var(--color-blue);
  color: #fff;
`;

type ButtonType = {
  active?: boolean;
  primary?: boolean;
  secondary?: boolean;
  text?: boolean;
};

const Button = styled.button<ButtonType>`
  background-color: var(--color-blue);
  color: #fff;
  background-color: var(--color-grey-200);
  color: var(--color-darkblue);
  border-radius: 0.875rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.875rem 1.5rem;
  cursor: pointer;

  &:hover {
    ${PrimaryStyle}
  }

  ${(props) => {
    if (props.active || props.primary)
      return css`
        ${PrimaryStyle}
      `;
    if (props.secondary)
      return css`
        background-color: #fff;
      `;
    if (props.text)
      return css`
        background-color: transparent;
      `;
  }}
`;

export default Button;
