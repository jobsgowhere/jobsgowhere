import React from "react";

import { Fieldset, Hint, Label, TextInput } from "../../../components/FormFields";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const LinkField: React.FC<Props> = function (props) {
  const { value, onChange } = props;
  return (
    <Fieldset name="link">
      <Label htmlFor="link">Job Role Link</Label>
      <TextInput type="text" id="link" name="link" value={value} onChange={onChange} />
      <Hint>
        Include a job link for potential candiates to learn more about the role you are hiring.
      </Hint>
    </Fieldset>
  );
};

export default LinkField;
