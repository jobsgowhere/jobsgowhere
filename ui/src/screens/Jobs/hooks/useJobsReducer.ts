import axios from "axios";
import React from "react";
import { useRouteMatch } from "react-router-dom";

import { PostInterface } from "../../../types";

// State

type JobsState = {
  jobs: PostInterface[];
  activeJob: PostInterface | undefined;
};

const initialState: JobsState = {
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

type JobsActionTypes = SetActiveJobAction | ToggleFavouriteJobAction | UpdateJobsAction;

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
}

interface JobsResponseData {
  jobs: PostInterface[];
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
  const actions: JobsActions = React.useMemo(() => {
    return {
      setActiveJob,
      toggleFavouriteJob,
      updateJobs,
    };
  }, [setActiveJob, toggleFavouriteJob, updateJobs]);

  const match = useRouteMatch<{ id: string }>("/jobs/:id");
  const id = match?.params?.id;

  React.useEffect(() => {
    axios.get<JobsResponseData>(`${process.env.REACT_APP_API}/jobs`).then((res) => {
      updateJobs(res.data.jobs);
      setFetched(true);
    });
  }, [updateJobs]);

  React.useEffect(() => {
    if (fetched) setActiveJob(id);
  }, [id, setActiveJob, fetched]);

  return [state, actions];
}
