import styled, { css } from "styled-components";

const inputLayout = css`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
`;
const inputBorder = css`
  border: 0.0625rem solid var(--color-grey-200);
  border-radius: 0.875rem;
`;
const inputFont = css`
  color: var(--color-dark-blue);
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

export const TextInput = styled.input.attrs({ type: "text" })`
  ${inputBorder};
  ${inputFont};
  ${inputLayout};
`;

export const TextArea = styled.textarea`
  ${inputBorder};
  ${inputFont};
  ${inputLayout};
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
