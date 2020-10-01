import React from 'react'

import { PostInterface } from '../types'
import JobsGoWhereApiClient from '../shared/services/JobsGoWhereApiClient'

export interface PostContextValue {
  post: PostInterface | null
  setPost: React.Dispatch<PostInterface>;
  // refresh: () => Promise<FullProfile>;
}

const PostContext = React.createContext<PostContextValue | undefined>(undefined)

export const PostProvider: React.FC = function (props) {
  const { children } = props;
  const [post, setPost] = React.useState<PostInterface | null>(null);

  const value = {
    post,
    setPost
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;

}

export const usePost = function () {
  const context = React.useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
}

// export const PostContext = React.createContext(PostC)
