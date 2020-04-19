import React from "react";
import styled from "styled-components";

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
  return (
    <Container>
      <h4>Choose your post type</h4>
      <div>
        <label htmlFor="type">I&apos;m Hiring</label>
        <input type="radio" id="type" name="type" value="job" />
        <label htmlFor="type">I&apos;m Seeking</label>
        <input type="radio" id="type" name="type" value="talent" />
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" />
      </div>
      <div>Button goes here…</div>
    </Container>
  );
};

export default NewPostForm;
