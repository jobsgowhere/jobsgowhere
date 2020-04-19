import { useMachine } from "@xstate/react";
import React from "react";
import styled from "styled-components";

import NewPostFormMachine, { PostType } from "../machines/NewPostForm";
import PostTypeField from "./PostTypeField";

const Container = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  max-width: 29.75rem;
  width: 100%;
  background-color: white;
  border-radius: 0.875rem;
  padding: 1.5rem;
`;

const NewPostForm: React.FC = function () {
  const [state, send] = useMachine(NewPostFormMachine);
  const { fields, error } = state.context;
  const handleTypeChange = (value: PostType) => {
    send({ type: "FILLING", payload: { key: "type", value } });
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({ type: "FILLING", payload: { key: "title", value: e.target.value } });
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    send({ type: "FILLING", payload: { key: "description", value: e.target.value } });
  };
  return (
    <Container>
      <h4>Choose your post type</h4>
      <PostTypeField value={fields.type} onChange={handleTypeChange} />
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={fields.title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={fields.description}
          onChange={handleDescriptionChange}
        />
      </div>
      {error && <div>Error: {error.message}</div>}
      <div>Button goes here…</div>
    </Container>
  );
};

export default NewPostForm;
