import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { CategoryTypes, PostInterface } from "../../types";
import {
  Avatar,
  AvatarImage,
  ContentContainer,
  Headline,
  Info,
  InfoHeader,
  Name,
  Timestamp,
  Title,
} from "./PostComponents";

const Container = styled.div<{ active?: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  /* height: 172px; */
  background-color: white;
  border-radius: 0.875rem;
  overflow: hidden;

  &::before {
    content: "";
    width: 0.75rem;
    background-color: ${(props) => (props.active ? "var(--color-blue)" : "transparent")};
    flex: 0 0 auto;
  }
`;

const PostContentContainer = styled(ContentContainer)`
  padding-left: 0.75rem;
`;

type PostProps = {
  key?: string;
  active?: boolean;
  data: PostInterface;
  category: CategoryTypes;
};
const Post: React.FC<PostProps> = function (props) {
  const { active, data, category } = props;
  const { created_by: user } = data;
  return (
    <Link to={`/${category}/${data.id}`}>
      <Container active={active}>
        <PostContentContainer>
          <Avatar>
            <AvatarImage src={user.avatar_url} />
          </Avatar>
          <Info>
            <InfoHeader>
              <div>
                <Name>
                  {user.first_name} {user.last_name}
                </Name>
                <Headline>
                  {user.job_title} at {user.company}
                </Headline>
              </div>
            </InfoHeader>
            <Title>{data.title}</Title>
            <Timestamp>Today · You have connected</Timestamp>
          </Info>
        </PostContentContainer>
      </Container>
    </Link>
  );
};

export default Post;
