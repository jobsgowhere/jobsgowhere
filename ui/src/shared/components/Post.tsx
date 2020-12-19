import formatDistance from "date-fns/esm/formatDistance";
import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { SCREENS } from "../../media";
import { CategoryTypes, PostInterface } from "../../types";
import boldSeekingHiring from "../lib/boldSeekingHiring";
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
  cursor: pointer;
  background-color: white;
  border-radius: 0.875rem;
  overflow: hidden;

  &::before {
    content: "";
    width: 0.75rem;
    flex: 0 0 auto;
    ${SCREENS.Up.Desktop} {
      background-color: ${(props) => (props.active ? "var(--color-blue)" : "transparent")};
    }
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
  const history = useHistory();
  return (
    <a
      onClick={() => {
        history.push(`/${category}/${data.id}`);
      }}
    >
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
                  {user.job_title}
                  {Boolean(user.company) && ` at ${user.company}`}
                </Headline>
              </div>
            </InfoHeader>
            <Title>{boldSeekingHiring(data.title)}</Title>
            <Timestamp>{formatDistance(new Date(data.created_at), Date.now())} ago</Timestamp>
          </Info>
        </PostContentContainer>
      </Container>
    </a>
  );
};

export default Post;
