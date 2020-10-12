import * as React from "react";
import styled, { css } from "styled-components";

const inputLayout = css`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
`;
const inputBorder = css`
  border: 0.0625rem solid var(--color-grey-200);
  border-radius: 0.875rem;
  outline: none;
  &:focus {
    border-color: var(--color-blue);
  }
`;
const inputFont = css`
  color: var(--color-darkblue);
  font-size: 1rem;
`;

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 0;
  padding: 0;
  margin: 0 0 0.5rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: baseline;
  padding: 0.5rem 0;
  font-weight: bold;
`;

interface InputErrorProp {
  error?: boolean;
}

const inputError = css`
  &,
  &:focus {
    border-color: var(--color-red);
  }
`;

export const InputErrorMessage = styled.div`
  color: var(--color-red);
  font-size: 0.75rem;
  margin-top: -0.5rem;
  margin-bottom: 0.25rem;
`;

export const TextInput = styled.input.attrs<InputErrorProp>((props) => ({
  type: props.type || "text",
}))<InputErrorProp>`
  ${inputBorder};
  ${inputFont};
  ${inputLayout};
  ${({ error }) => error && inputError}
`;

export const TextArea = styled.textarea<InputErrorProp>`
  ${inputBorder};
  ${inputFont};
  ${inputLayout};
  ${({ error }) => error && inputError}
`;

export const TextAreaCount = styled.small`
  font-size: 0.75rem;
  margin-left: auto;
  font-weight: normal;
  color: var(--color-grey-300);
`;

export const Hint = styled.small`
  font-size: 0.875rem;
  color: var(--color-grey-300);
  margin-bottom: 1rem;
`;

const StyledRadioGroup = styled.label`
  display: flex;
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    clip: rect(0, 0, 0, 0);
  }
`;

const StyledRadio = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0.125rem 0 0.125rem 2rem;
  line-height: 1.275;

  &::before {
    border-radius: 100%;
    content: "";
    width: 1.5rem;
    height: 1.5rem;
    background-color: var(--color-grey-100);
    margin-right: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  &::after {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
    background-color: var(--color-blue);
    border-radius: 100%;
    position: absolute;
    left: 0.375rem;
    top: 0.375rem;
    visibility: hidden;
  }

  input:checked + &::after {
    visibility: visible;
  }
`;

type RadioProps = {
  value: string;
  name: string;
  defaultChecked?: boolean;
  innerRef?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio: React.FC<RadioProps> = ({ children, innerRef, ...props }) => (
  <StyledRadioGroup>
    <input type="radio" ref={innerRef} {...props} />
    <StyledRadio>{children}</StyledRadio>
  </StyledRadioGroup>
);
