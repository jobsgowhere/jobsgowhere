import { act, fireEvent, render } from "@testing-library/react";
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

const seekerProfile: FullProfile = { ...profileWithoutType, profileType: "Seeker" };
const recruiterProfile: FullProfile = { ...profileWithoutType, profileType: "Recruiter" };

const TestContainer: React.FC<{ profile: FullProfile }> = ({ profile }) => {
  const history = createMemoryHistory();
  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile: jest.fn(),
        refresh: jest.fn(),
      }}
    >
      <PostProvider>
        <Router history={history}>
          <NewPostForm />
        </Router>
      </PostProvider>
    </ProfileContext.Provider>
  );
};

test("Renders form with title and description fields, cancel and submit buttons", () => {
  const { getByLabelText, getByText } = render(<TestContainer profile={seekerProfile} />);
  getByLabelText(/title/i);
  getByLabelText(/description/i);
  getByText(/cancel/i);
  getByText(/create/i);
});

test("Shows appropriate fields if user is seeker", () => {
  const { getByTestId, queryByLabelText } = render(<TestContainer profile={seekerProfile} />);
  expect(getByTestId("post-type")).toHaveTextContent("I'm Seeking");
  expect(queryByLabelText(/job role link/i)).toBeNull();
});
test("Shows appropriate fields if user is recruiter", () => {
  const { getByTestId, getByLabelText } = render(<TestContainer profile={recruiterProfile} />);
  expect(getByTestId("post-type")).toHaveTextContent("I'm Hiring");
  getByLabelText(/job role link/i);
});

test("Shows errors if submitted with empty fields", async () => {
  const { getByText, queryByTestId, findByTestId } = render(
    <TestContainer profile={recruiterProfile} />,
  );
  // Should have no errors at the start
  expect(queryByTestId("input-error-title")).toBeNull();
  expect(queryByTestId("input-error-link")).toBeNull();
  expect(queryByTestId("input-error-description")).toBeNull();
  const button = getByText(/create/i);
  fireEvent.click(button);
  const titleError = await findByTestId("input-error-title");
  expect(titleError).toHaveTextContent(/Please enter a post title/i);
  const linkError = await findByTestId("input-error-link");
  expect(linkError).toHaveTextContent(/Please enter a job link in this format/i);
  const descError = await findByTestId("input-error-description");
  expect(descError).toHaveTextContent(/Please enter a post description/i);
});
