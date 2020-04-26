import React from "react";
import styled from "styled-components";

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 0;
  padding: 0.875rem;
  margin: 0;
`;

const Label = styled.label`
  border-radius: 0.875rem;
  font-weight: bold;
  padding: 0.875rem;
`;
const Text = styled.input.attrs({ type: "text" })`
  border: 0;
  border-style: solid;
  border-color: #dddddd;
  border-width: 0.1rem;
  border-radius: 0.875rem;
  min-height: 2rem;
`;

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const LinkField: React.FC<Props> = function (props) {
  const { value, onChange } = props;
  return (
    <Fieldset name="link">
      <Label htmlFor="link">Job Role Link</Label>
      <Text type="text" id="link" name="link" value={value} onChange={onChange} />
      <sub>
        Include a job link for potential candiates to learn more about the role you are hiring.
      </sub>
    </Fieldset>
  );
};

export default LinkField;
