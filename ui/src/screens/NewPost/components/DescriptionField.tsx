import React from "react";
import styled from "styled-components";

import { Fieldset, Label, TextArea, TextAreaCount } from "../../../components/FormFields";

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
        Description <TextAreaCount>{remaining} characters</TextAreaCount>
      </Label>
      <TextArea rows={10} id="description" name="description" value={value} onChange={onChange} />
    </Fieldset>
  );
};

export default DescriptionField;
