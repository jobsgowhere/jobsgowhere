import * as React from "react";
import styled from "styled-components";
import axios from "axios";

import Main from "../../components/Main";
import Post from "./components/Post";
import PostDetail from "./components/PostDetail";

import { PostInterface } from "../../interfaces";

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  flex: 1;
`;

type PostsScreenProps = {};

type PostsState = {
  jobs: PostInterface[];
  talents: PostInterface[];
  activePost: PostInterface | null;
};

type ReducerAction = {
  type: string;
  value: any;
};

const PostsReducer = (state: PostsState, action: ReducerAction) => {
  switch (action.type) {
    case "UPDATE_JOBS": {
      const fetchedJobs = action.value;
      return {
        ...state,
        jobs: fetchedJobs.map((job: object) => ({
          ...job,
          active: false,
        })),
      };
    }
    case "SET_ACTIVE_JOB": {
      return {
        ...state,
        jobs: state.jobs.map((job) => ({
          ...job,
          active: job === action.value,
        })),
        activePost: action.value,
      };
    }
    case "TOGGLE_FAVOURITE_JOB": {
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job === action.value
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
};

const initialState = {
  jobs: [],
  talents: [],
  activePost: null,
};

function PostsScreen(props: PostsScreenProps) {
  const [state, dispatch] = React.useReducer(PostsReducer, initialState);

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/jobs")
      .then((res) => dispatch({ type: "UPDATE_JOBS", value: res.data.jobs }));
  }, []);
  return (
    <Main>
      <Main.Col>
        <ListContainer>
          {state.jobs.map((job: PostInterface) => (
            <Post
              onClick={() => dispatch({ type: "SET_ACTIVE_JOB", value: job })}
              active={job.active}
              key={job.id}
              data={job}
              handleFavouriteToggle={(e) => {
                e.stopPropagation();
                dispatch({ type: "TOGGLE_FAVOURITE_JOB", value: job });
              }}
            />
          ))}
        </ListContainer>
      </Main.Col>
      <Main.Col>
        <DetailsContainer>
          <PostDetail data={state.activePost} />
        </DetailsContainer>
      </Main.Col>
    </Main>
  );
}

export default PostsScreen;
