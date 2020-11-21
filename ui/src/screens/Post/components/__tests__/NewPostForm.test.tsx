import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import { PostProvider } from "../../../../contexts/Post";
import { ProfileContext } from "../../../../contexts/Profile";
import { FullProfile } from "../../../../types";
import NewPostForm from "../NewPostForm";

const profileWithoutType = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@testrecruiter.com",
  picture: "pic",
  headline: "A test recruiter",
  website: "http://testrecruiter.com",
  id: "123",
  status: "Complete" as const,
};

function renderForm(profile: FullProfile) {
  const history = createMemoryHistory();
  return render(
    <ProfileContext.Provider
      value={{
        profile: profile as FullProfile,
        setProfile: jest.fn(),
        refresh: jest.fn(),
      }}
    >
      <PostProvider>
        <Router history={history}>
          <NewPostForm />
        </Router>
      </PostProvider>
    </ProfileContext.Provider>,
  );
}

test("Shows post type as 'I'm Seeking' if user is seeker", () => {
  const { getByTestId } = renderForm({
    ...profileWithoutType,
    profileType: "Seeker",
  });
  expect(getByTestId("post-type")).toHaveTextContent("I'm Seeking");
});

test("Shows post type as 'I'm Hiring' if user is seeker", () => {
  const { getByTestId } = renderForm({
    ...profileWithoutType,
    profileType: "Recruiter",
  });
  expect(getByTestId("post-type")).toHaveTextContent("I'm Hiring");
});
