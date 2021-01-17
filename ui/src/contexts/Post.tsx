import React from "react";

import { CategoryTypes, PostInterface } from "../types";

export interface PostContextValue {
  post?: PostInterface | null;
  setPost: React.Dispatch<PostInterface | null>;
  type?: CategoryTypes | null;
  setType: React.Dispatch<CategoryTypes | null>;
}

const PostContext = React.createContext<PostContextValue | undefined>(undefined);

export const PostProvider: React.FC = function (props) {
  const { children } = props;
  const [post, setPost] = React.useState<PostInterface | null>(null);
  const [type, setType] = React.useState<CategoryTypes | null>(null);

  const value = {
    post,
    setPost,
    type,
    setType,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = function () {
  const context = React.useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
