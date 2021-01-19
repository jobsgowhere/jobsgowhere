import React from "react";
import { UseFormMethods, ValidationRules } from "react-hook-form";

import { Fieldset, Label, TextInput } from "../../../components/FormFields";

interface Props {
  register?: UseFormMethods["register"];
  rules?: ValidationRules;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TitleField: React.FC<Props> = function (props) {
  const { value, onChange, register, rules = {} } = props;
  return (
    <Fieldset name="title">
      <Label htmlFor="title">Title</Label>
      <TextInput
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        ref={register && register(rules)}
      />
    </Fieldset>
  );
};

export default TitleField;
