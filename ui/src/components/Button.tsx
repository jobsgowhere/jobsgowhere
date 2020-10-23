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
  fullWidth?: boolean;
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
  padding: 0.75rem 1.5rem;
  cursor: pointer;

  &:hover::not([disabled]) {
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
        color: var(--color-blue);
      `;
    if (props.text)
      return css`
        background-color: transparent;
      `;
    if (props.disabled) {
      return css`
        color: var(--color-grey-300);
        cursor: not-allowed;
      `;
    }
  }}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

export default Button;
