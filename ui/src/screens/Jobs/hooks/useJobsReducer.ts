import axios from "axios";
import React from "react";
import { useRouteMatch } from "react-router-dom";

import { PostInterface } from "../../../types";

// State

type JobsState = {
  page: number;
  jobs: PostInterface[];
  activeJob: PostInterface | undefined;
};

const initialState: JobsState = {
  page: 1,
  jobs: [],
  activeJob: undefined,
};

// Actions

const SET_ACTIVE_JOB = "SET_ACTIVE_JOB";
interface SetActiveJobAction {
  type: typeof SET_ACTIVE_JOB;
  payload?: string;
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

const SET_PAGE = "SET_PAGE";
interface SetPageAction {
  type: typeof SET_PAGE;
  payload: number;
}

type JobsActionTypes =
  | SetActiveJobAction
  | ToggleFavouriteJobAction
  | UpdateJobsAction
  | SetPageAction;

// Reducer

function JobsReducer(state: JobsState, action: JobsActionTypes): JobsState {
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
      const { payload: id } = action;
      const activeJob = state.jobs.find((job: PostInterface) => job.id === id);
      return {
        ...state,
        jobs: state.jobs.map((job: PostInterface) => ({
          ...job,
          active: job === activeJob,
        })),
        activeJob,
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

interface JobsActions {
  setActiveJob(id: string): void;
  toggleFavouriteJob(job: PostInterface): void;
  updateJobs(jobs: PostInterface[]): void;
  setPage(page: number): void;
}

export default function usePostsReducer(): [JobsState, JobsActions] {
  const [state, dispatch] = React.useReducer(JobsReducer, initialState);
  const [fetched, setFetched] = React.useState(false);

  const setActiveJob = React.useCallback((id?: string): void => {
    dispatch({ type: SET_ACTIVE_JOB, payload: id });
  }, []);
  const toggleFavouriteJob = React.useCallback((job: PostInterface): void => {
    dispatch({ type: TOGGLE_FAVOURITE_JOB, payload: job });
  }, []);
  const updateJobs = React.useCallback((jobs: PostInterface[]): void => {
    dispatch({ type: UPDATE_JOBS, payload: jobs });
  }, []);
  const setPage = React.useCallback((page: number): void => {
    dispatch({ type: SET_PAGE, payload: page });
  }, []);
  const actions: JobsActions = React.useMemo(() => {
    return {
      setActiveJob,
      toggleFavouriteJob,
      updateJobs,
      setPage,
    };
  }, [setActiveJob, toggleFavouriteJob, updateJobs]);

  const match = useRouteMatch<{ id: string }>("/jobs/:id");
  const id = match?.params?.id;

  React.useEffect(() => {
    axios.get<PostInterface[]>(`${process.env.REACT_APP_API}/jobs/${state.page}`).then((res) => {
      updateJobs(res.data);
      setFetched(true);
    });
  }, [updateJobs]);

  React.useEffect(() => {
    if (fetched) setActiveJob(id);
  }, [id, setActiveJob, fetched]);

  return [state, actions];
}
