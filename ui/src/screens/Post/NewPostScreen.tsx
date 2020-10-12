import React from "react";
import { RouteProps } from "react-router";
import { useLocation } from "react-router-dom";

import { MainSingle } from "../../components/Main";
import NewPostForm from "./components/NewPostForm";
import { usePost } from  "../../contexts/Post"

const PostScreen: React.FC<RouteProps> = function () {
  const postContext = usePost();
  const location = useLocation();

  const EDIT_POST_PATHNAME = "/posts/edit";

  return (
    <MainSingle>
      <h1>{ postContext.post?.id && location.pathname === EDIT_POST_PATHNAME ? "Edit Post" : "New Post" }</h1>
      <NewPostForm />
    </MainSingle>
  );
};

export default PostScreen;
