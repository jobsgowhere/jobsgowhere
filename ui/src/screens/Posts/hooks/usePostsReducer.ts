import axios from "axios";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { PostInterface } from "../../../interfaces";

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

const SET_ACTIVE_JOB = "SET_ACTIVE_JOB";
interface SetActiveJobAction {
  type: typeof SET_ACTIVE_JOB;
  payload: string;
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

type PostsActionTypes =
  | SetActiveJobAction
  | ToggleFavouriteJobAction
  | UpdateJobsAction;

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
    case SET_ACTIVE_JOB: {
      const activeJob = state.jobs.find(
        (job: PostInterface) => job.id === action.payload
      );
      return {
        ...state,
        jobs: state.jobs.map((job) => ({
          ...job,
          active: job.id === action.payload,
        })),
        activePost: activeJob,
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
            : job
        ),
      };
    }
    default:
      return state;
  }
}

// Hook

interface PostsActions {
  setActiveJob(id: string): void;
  toggleFavouriteJob(job: PostInterface): void;
  updateJobs(jobs: PostInterface[]): void;
};

interface JobsResponseData {
  jobs: PostInterface[]
}

export default function usePostsReducer(): [PostsState, PostsActions] {
  const [state, dispatch] = React.useReducer(PostsReducer, initialState);

  const setActiveJob = React.useCallback((id: string): void => {
    dispatch({ type: SET_ACTIVE_JOB, payload: id });
  }, []);
  const toggleFavouriteJob = React.useCallback((job: PostInterface): void => {
    dispatch({ type: TOGGLE_FAVOURITE_JOB, payload: job });
  }, []);
  const updateJobs = React.useCallback((jobs: PostInterface[]): void => {
    dispatch({ type: UPDATE_JOBS, payload: jobs });
  }, []);
  const actions: PostsActions = React.useMemo(() => {
    return {
      setActiveJob,
      toggleFavouriteJob,
      updateJobs,
    };
  }, [setActiveJob, toggleFavouriteJob, updateJobs]);

  const match = useRouteMatch<{ id: string }>("/posts/:id");
  const id = match?.params?.id;

  React.useEffect(() => {
    axios.get<JobsResponseData>("http://localhost:8080/api/jobs").then((res) => {
      updateJobs(res.data.jobs);
      if (id) setActiveJob(id);
    });
  }, [id, setActiveJob, updateJobs]);
  React.useEffect(() => {
    if (id) setActiveJob(id);
  }, [id, setActiveJob]);

  return [state, actions];
}
