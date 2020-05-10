import React from "react";
import { useHistory } from "react-router-dom";
import { Event, State } from "xstate";
import styled from "styled-components";

import { NewPostFormContext, NewPostFormEvent } from "../machines/NewPostForm";
import Button from "../../../components/Button";

const Buttons = styled.div`
  display: flex;
  ${Button} + ${Button} {
    margin-left: 1rem;
  }
`;

type ActionsProps = {
  state: State<NewPostFormContext, NewPostFormEvent>;
  send: (event: Event<NewPostFormEvent>) => void;
};
const Actions: React.FC<ActionsProps> = function (props) {
  const { state, send } = props;
  const { error } = state.context;
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  const handleSubmit = () => {
    send({ type: "SUBMIT", payload: {} });
  };
  switch (true) {
    case state.matches("active"): {
      return (
        <>
          {error && <div>Error: {error.message}</div>}
          <Buttons>
            <Button fullWidth type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button fullWidth primary type="button" onClick={handleSubmit}>
              Create
            </Button>
          </Buttons>
        </>
      );
    }
    case state.matches("submitting"): {
      return <div>Submitting…</div>;
    }
    case state.matches("submitted"): {
      return <div>Submitted</div>;
    }
    default: {
      // FIXME: (me@lxcid.com) Should handle by error boundary
      return null;
    }
  }
};

export default Actions;
