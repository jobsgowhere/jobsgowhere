import produce from "immer";
import { assign, Machine } from "xstate";

export type PostType = "job" | "talent";

export interface NewPostFormContext {
  fields: {
    type: PostType;
    title: string;
    description: string;
  };
  error: Error | undefined;
}

export interface NewPostFormSchema {
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
export type NewPostFormEvent = FillingEvent | SubmitEvent;

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

const clearError = assign<NewPostFormContext>((context, event) => {
  return produce(context, (draftState) => {
    draftState.error = undefined;
  });
});

const setError = assign<NewPostFormContext>((context, event) => {
  if (!event.type.startsWith("error.platform.")) {
    throw new Error("Invalid code execution path");
  }
  return produce(context, (draftState) => {
    // FIXME: (me@lxcid.com) Not sure how to declare the right type of a promise like service
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draftState.error = (event as any).data;
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
        onExit: "clearError",
        on: {
          FILLING: {
            actions: "filling",
          },
          SUBMIT: "submitting",
        },
      },
      submitting: {
        invoke: {
          id: "submitting",
          src: "submit",
          onDone: {
            target: "submitted",
          },
          onError: {
            target: "active",
            actions: "setError",
          },
        },
      },
      submitted: {},
    },
  },
  {
    actions: {
      filling,
      clearError,
      setError,
    },
  },
);

export default NewPostFormMachine;
