import React from "react";
import { RouteProps } from "react-router";
import styled from "styled-components";

import { MainSingle } from "../../components/Main";
import NewPostForm from "./components/NewPostForm";

const NewPostScreen: React.FC<RouteProps> = function () {
  return (
    <MainSingle>
      <h1>New Post</h1>
      <NewPostForm />
    </MainSingle>
  );
};

export default NewPostScreen;
