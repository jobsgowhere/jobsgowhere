import React from "react";
import { UseFormMethods, ValidationRules, FieldError } from "react-hook-form";

import {
  Fieldset,
  Label,
  TextArea,
  TextAreaCount,
  InputErrorMessage,
} from "../../../components/FormFields";

interface Props {
  register?: UseFormMethods["register"];
  rules?: ValidationRules;
  error?: FieldError;
}

const MAX_LENGTH = 500;

const DescriptionField: React.FC<Props> = function (props) {
  const { register, rules = {}, error } = props;
  const [remaining, setRemaining] = React.useState(MAX_LENGTH);

  return (
    <Fieldset name="description">
      <Label htmlFor="description">
        Description <TextAreaCount>{remaining} characters</TextAreaCount>
      </Label>
      <TextArea
        onChange={(e) => setRemaining(MAX_LENGTH - e.target.value.length)}
        maxLength={MAX_LENGTH}
        rows={10}
        id="description"
        name="description"
        ref={register && register(rules)}
        error={!!error}
      />
      {error && <InputErrorMessage>{error.message}</InputErrorMessage>}
    </Fieldset>
  );
};

export default DescriptionField;
