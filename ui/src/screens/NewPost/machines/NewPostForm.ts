import produce from "immer";
import { assign, Machine } from "xstate";

export type PostType = "job" | "talent";

interface NewPostFormContext {
  fields: {
    type: PostType;
    title: string;
    description: string;
  };
  error: Error | undefined;
}

interface NewPostFormSchema {
  states: {
    active: {};
    submitting: {};
    submitted: {};
  };
}

type FillingEvent = {
  type: "FILLING";
  payload:
    | { key: "type"; value: PostType }
    | { key: "title"; value: string }
    | { key: "description"; value: string };
};
type SubmitEvent = {
  type: "SUBMIT";
  payload: {};
};
type NewPostFormEvent = FillingEvent | SubmitEvent;

const filling = assign<NewPostFormContext, NewPostFormEvent>((context, event) => {
  if (event.type !== "FILLING") {
    return context;
  }
  const { key, value } = event.payload;
  return produce(context, (draftState) => {
    switch (key) {
      case "type": {
        draftState.fields[key] = value as PostType;
        break;
      }
      default: {
        draftState.fields[key] = value;
        break;
      }
    }
    return draftState;
  });
});

const NewPostFormMachine = Machine<NewPostFormContext, NewPostFormSchema, NewPostFormEvent>(
  {
    context: {
      fields: {
        type: "talent",
        title: "",
        description: "",
      },
      error: undefined,
    },
    id: "new-post-form",
    initial: "active",
    states: {
      active: {
        on: {
          FILLING: {
            actions: "filling",
          },
          SUBMIT: "submitting",
        },
      },
      submitting: {
        invoke: {
          src: "submit",
          onDone: {
            target: "submitted",
          },
          onError: {
            target: "active",
          },
        },
      },
      submitted: {},
    },
  },
  {
    actions: {
      filling,
    },
  },
);

export default NewPostFormMachine;
