import React from "react";
import { RouteProps } from "react-router";

import { MainSingle } from "../../components/Main";
import NewPostForm from "./components/NewPostForm";
import { usePost } from  "../../contexts/Post"

const PostScreen: React.FC<RouteProps> = function () {
  const postContext = usePost();

  return (
    <MainSingle>
      <h1>{ postContext.post?.id ? "Edit Post" : "New Post" }</h1>
      <NewPostForm />
    </MainSingle>
  );
};

export default PostScreen;
