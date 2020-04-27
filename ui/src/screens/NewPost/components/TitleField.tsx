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
const TitleField: React.FC<Props> = function (props) {
  const { value, onChange } = props;
  return (
    <Fieldset name="title">
      <Label htmlFor="title">Title</Label>
      <Text type="text" id="title" name="title" value={value} onChange={onChange} />
    </Fieldset>
  );
};

export default TitleField;
