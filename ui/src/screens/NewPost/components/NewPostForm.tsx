import { useMachine } from "@xstate/react";
import React from "react";
import styled from "styled-components";
import { AnyEventObject, InvokeCreator } from "xstate";

import NewPostFormMachine, {
  NewPostFormContext,
  PostType,
} from "../machines/NewPostForm";
import Actions from "./Actions";
import DescriptionField from "./DescriptionField";
import LinkField from "./LinkField";
import PostTypeField from "./PostTypeField";
import TitleField from "./TitleField";

const Container = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  background-color: white;
  border-radius: 0.875rem;
  padding: 1.5rem;
`;

const NewPostForm: React.FC = function () {
  const submit: InvokeCreator<NewPostFormContext, AnyEventObject> = async (context, event) => {
    console.log(context.fields);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    throw new Error("Fake Submission Failure");
  };
  const [state, send] = useMachine(NewPostFormMachine, {
    services: {
      submit,
    },
  });
  const { fields } = state.context;
  const handleTypeChange = (value: PostType) => {
    send({ type: "FILLING", payload: { key: "type", value } });
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({ type: "FILLING", payload: { key: "title", value: e.target.value } });
  };
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({ type: "FILLING", payload: { key: "link", value: e.target.value } });
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    send({ type: "FILLING", payload: { key: "description", value: e.target.value } });
  };
  return (
    <Container>
      <PostTypeField value={fields.type} onChange={handleTypeChange} />
      <TitleField value={fields.title} onChange={handleTitleChange} />
      {fields.link != null && <LinkField value={fields.link} onChange={handleLinkChange} />}
      <DescriptionField value={fields.description} onChange={handleDescriptionChange} />
      <Actions state={state} send={send} />
    </Container>
  );
};

export default NewPostForm;
