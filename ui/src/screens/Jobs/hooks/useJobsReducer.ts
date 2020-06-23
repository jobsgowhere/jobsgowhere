import axios from "axios";
import React from "react";
import { useRouteMatch } from "react-router-dom";

import { PostInterface } from "../../../types";

// State

type JobsState = {
  fetched: boolean;
  more: boolean;
  jobs: PostInterface[];
  activeJob: PostInterface | undefined;
};

const initialState: JobsState = {
  fetched: false,
  more: true,
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
      const jobs = state.jobs;
      const fetchedJobs = action.payload;
      const combined = [...jobs, ...fetchedJobs];
      return {
        ...state,
        fetched: true,
        more: fetchedJobs.length !== 0,
        jobs: combined.map((job: PostInterface) => ({
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
    if (state.fetched) {
      const initialActiveId = id || state.jobs[0].id;
      setActiveJob(initialActiveId);
    }
  }, [id, setActiveJob, state.fetched]);

  return [state, actions];
}
