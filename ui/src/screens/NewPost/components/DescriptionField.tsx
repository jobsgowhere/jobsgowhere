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
const TextArea = styled.textarea`
  border: 0;
  border-style: solid;
  border-color: #dddddd;
  border-width: 0.1rem;
  border-radius: 0.875rem;
  min-height: 10rem;
`;

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const DescriptionField: React.FC<Props> = function (props) {
  const { value, onChange } = props;
  const remaining = 500 - value.length;
  return (
    <Fieldset name="description">
      <Label htmlFor="description">
        Description <sub>{remaining} characters</sub>
      </Label>
      <TextArea id="description" name="description" value={value} onChange={onChange} />
    </Fieldset>
  );
};

export default DescriptionField;
