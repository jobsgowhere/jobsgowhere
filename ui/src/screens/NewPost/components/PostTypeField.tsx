import React from "react";
import styled, { css } from "styled-components";

import { PostType } from "../machines/NewPostForm";

import { Fieldset } from "../../../components/FormFields";

interface LabelProps {
  checked: boolean;
}

const Legend = styled.legend`
  font-weight: bold;
  padding: 0.5rem 0 1rem;
  color: var(--color-dark-blue);
`;

const Label = styled.label<LabelProps>`
  display: inline-block;
  border-radius: 0.875rem;
  padding: 0.875rem 1rem;
  cursor: pointer;
  font-size: 1.125rem;
  ${(props) =>
    props.checked &&
    css`
      background-color: var(--color-grey-100);
      font-weight: bold;
    `}
  & + & {
    margin-left: 0.75rem;
  }
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
      <div>
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
      </div>
    </Fieldset>
  );
};

export default PostTypeField;
