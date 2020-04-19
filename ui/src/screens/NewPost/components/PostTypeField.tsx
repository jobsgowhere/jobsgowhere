import React from "react";

import { PostType } from "../machines/NewPostForm";

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
    <div>
      <label htmlFor="type">I&apos;m Hiring</label>
      <input
        type="radio"
        id="type"
        name="type"
        value="job"
        checked={value === "job"}
        onChange={handleChange}
      />
      <label htmlFor="type">I&apos;m Seeking</label>
      <input
        type="radio"
        id="type"
        name="type"
        value="talent"
        checked={value === "talent"}
        onChange={handleChange}
      />
    </div>
  );
};

export default PostTypeField;
