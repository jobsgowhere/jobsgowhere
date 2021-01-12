import { render } from "@testing-library/react";
import formatDistance from "date-fns/esm/formatDistance";
import React from "react";

import { MobileViewProvider } from "../../../contexts/MobileView";
import { PostInterface, User } from "../../../types";
import Post from "../Post";

test("Post renders content correctly", () => {
  const date = new Date();
  const user: User = {
    id: "1",
    first_name: "Homer",
    last_name: "Simpson",
    avatar_url: "avatar_url",
    job_title: "Full slack developer",
  };
  const postData: PostInterface = {
    id: "1",
    title: "Some job title",
    description: "The job title role",
    connectedCount: 2,
    connectedUser: false,
    active: false,
    favourite: false,
    created_at: date,
    created_by: user,
  };
  const { getByTestId } = render(
    <MobileViewProvider>
      <Post data={postData} category="jobs" />
    </MobileViewProvider>,
  );
  expect(getByTestId("user-avatar")).toHaveAttribute("src", "avatar_url");
  expect(getByTestId("user-name")).toHaveTextContent(/Homer Simpson/);
  expect(getByTestId("user-title")).toHaveTextContent(/Full slack developer/);
  expect(getByTestId("post-title")).toHaveTextContent(/Some job title/);
  expect(getByTestId("post-date")).toHaveTextContent(
    formatDistance(new Date(date), Date.now()) + " ago",
  );
});
