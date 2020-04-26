import React from "react";
import styled from "styled-components";

import { PostType } from "../machines/NewPostForm";

const Fieldset = styled.fieldset`
  display: flex;
  border: 0;
  padding: 0;
  margin: 0;
`;

const Legend = styled.legend`
  font-weight: bold;
  padding: 1rem 0;
`;

interface LabelProps {
  checked: boolean;
}
const Label = styled.label<LabelProps>`
  background-color: ${(props) => (props.checked ? "#eeeeee" : "transparent")};
  border-radius: 0.875rem;
  font-weight: ${(props) => (props.checked ? "bold" : "normal")};
  margin: 0.5rem;
  padding: 1rem;
`;
const Radio = styled.input.attrs({ type: "radio" })`
  display: none;
`;

type PostTypeFieldProps = {
  value: PostType;
  onChange: (type: PostType) => void;
};
const PostTypeField: React.FC<PostTypeFieldProps> = function (props) {
  const { value, onChange } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as PostType);
  };
  return (
    <Fieldset name="type">
      <Legend>Choose your post type</Legend>
      <Label checked={value === "job"} htmlFor="type-job">
        I&apos;m Hiring
        <Radio
          id="type-job"
          name="type"
          value="job"
          checked={value === "job"}
          onChange={handleChange}
        />
      </Label>

      <Label checked={value === "talent"} htmlFor="type-talent">
        I&apos;m Seeking
        <Radio
          id="type-talent"
          name="type"
          value="talent"
          checked={value === "talent"}
          onChange={handleChange}
        />
      </Label>
    </Fieldset>
  );
};

export default PostTypeField;
