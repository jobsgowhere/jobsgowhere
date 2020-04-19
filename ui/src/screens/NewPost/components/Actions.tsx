import React from "react";
import { Event, State } from "xstate";

import { NewPostFormContext, NewPostFormEvent } from "../machines/NewPostForm";

type ActionsProps = {
  state: State<NewPostFormContext, NewPostFormEvent>;
  send: (event: Event<NewPostFormEvent>) => void;
};
const Actions: React.FC<ActionsProps> = function (props) {
  const { state, send } = props;
  const { error } = state.context;
  const handleSubmit = () => {
    send({ type: "SUBMIT", payload: {} });
  };
  switch (true) {
    case state.matches("active"): {
      return (
        <>
          {error && <div>Error: {error.message}</div>}
          <div>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
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
