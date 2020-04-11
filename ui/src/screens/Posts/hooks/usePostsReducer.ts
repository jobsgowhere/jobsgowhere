import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { PostInterface, CategoryTypes } from "../../../types";

// State

type PostsState = {
  jobs: PostInterface[];
  talents: PostInterface[];
  activePost: PostInterface | undefined;
};

const initialState: PostsState = {
  jobs: [],
  talents: [],
  activePost: undefined,
};

// Actions

const SET_ACTIVE_POST = "SET_ACTIVE_POST";
interface SetActivePostAction {
  type: typeof SET_ACTIVE_POST;
  payload: { id: string; category: CategoryTypes };
}

const TOGGLE_FAVOURITE_JOB = "TOGGLE_FAVOURITE_JOB";
interface ToggleFavouriteJobAction {
  type: typeof TOGGLE_FAVOURITE_JOB;
  payload: PostInterface;
}

const UPDATE_JOBS = "UPDATE_JOBS";
interface UpdateJobsAction {
  type: typeof UPDATE_JOBS;
  payload: PostInterface[];
}

const UPDATE_TALENTS = "UPDATE_TALENTS";
interface UpdateTalentsAction {
  type: typeof UPDATE_TALENTS;
  payload: PostInterface[];
}

type PostsActionTypes =
  | SetActivePostAction
  | ToggleFavouriteJobAction
  | UpdateJobsAction
  | UpdateTalentsAction;

// Reducer

function PostsReducer(state: PostsState, action: PostsActionTypes): PostsState {
  switch (action.type) {
    case UPDATE_JOBS: {
      const fetchedJobs = action.payload;
      return {
        ...state,
        jobs: fetchedJobs.map((job: PostInterface) => ({
          ...job,
          active: false,
        })),
      };
    }
    case UPDATE_TALENTS: {
      const fetchedTalents = action.payload;
      return {
        ...state,
        talents: fetchedTalents.map((talent: PostInterface) => ({
          ...talent,
          active: false,
        })),
      };
    }
    case SET_ACTIVE_POST: {
      const { id, category } = action.payload;
      const activePost = state[category].find((post: PostInterface) => post.id === id);
      return {
        ...state,
        [category]: state[category].map((post: PostInterface) => ({
          ...post,
          active: post === activePost,
        })),
        activePost,
      };
    }
    case TOGGLE_FAVOURITE_JOB: {
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job === action.payload
            ? {
                ...job,
                favourite: !job.favourite,
              }
            : job,
        ),
      };
    }
    default:
      return state;
  }
}

// Hook

interface PostsActions {
  setActivePost(id: string, category: CategoryTypes): void;
  toggleFavouriteJob(job: PostInterface): void;
  updateJobs(jobs: PostInterface[]): void;
}

// type PostsResponseData {
//   jobs?: PostInterface[];
//   talents?: PostInterface[];
// }

export default function usePostsReducer(): [PostsState, PostsActions] {
  const [state, dispatch] = React.useReducer(PostsReducer, initialState);

  const setActivePost = React.useCallback((id: string, category: CategoryTypes): void => {
    dispatch({ type: SET_ACTIVE_POST, payload: { id, category } });
  }, []);
  const toggleFavouriteJob = React.useCallback((job: PostInterface): void => {
    dispatch({ type: TOGGLE_FAVOURITE_JOB, payload: job });
  }, []);
  const updateJobs = React.useCallback((jobs: PostInterface[]): void => {
    dispatch({ type: UPDATE_JOBS, payload: jobs });
  }, []);
  const updateTalents = React.useCallback((talents: PostInterface[]): void => {
    dispatch({ type: UPDATE_TALENTS, payload: talents });
  }, []);
  const actions: PostsActions = React.useMemo(() => {
    return {
      setActivePost,
      toggleFavouriteJob,
      updateJobs,
      updateTalents,
    };
  }, [setActivePost, toggleFavouriteJob, updateJobs]);

  const { category, id } = useParams<{ category: string; id: string }>();
  const castedCategory = category as CategoryTypes;

  React.useEffect(() => {
    axios.get(`/api/${castedCategory}`).then((res) => {
      if (castedCategory === "jobs") updateJobs(res.data.jobs);
      if (castedCategory === "talents") updateTalents(res.data.talents);
      if (id) setActivePost(id, castedCategory);
    });
  }, [id, castedCategory, setActivePost, updateJobs]);
  React.useEffect(() => {
    if (id) setActivePost(id, castedCategory);
  }, [id, castedCategory, setActivePost]);

  return [state, actions];
}
