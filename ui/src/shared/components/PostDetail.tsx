import * as React from "react";
import styled from "styled-components";

import { PostInterface } from "../../types";
import Button from "../../components/Button";
import FavouriteButton from "../../components/FavouriteButton";
import {
  ContentContainer,
  Avatar,
  AvatarImage,
  Info,
  InfoHeader,
  Name,
  Headline,
  Actions,
  Title,
  Description,
} from "./PostComponents";

const Container = styled.div`
  background-color: white;
  border-radius: 0.875rem;
  padding-left: 0.75rem;
`;

const ButtonContainer = styled.div`
  padding: 1rem 1.5rem 1.75rem 0.75rem;
`;

type PostDetailProps = {
  data: PostInterface;
};
const PostDetail: React.FC<PostDetailProps> = function (props) {
  const { data } = props;
  const { created_by: user } = data;
  return (
    <Container>
      <ContentContainer>
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
            <Actions>
              <FavouriteButton active={data.favourite} />
            </Actions>
          </InfoHeader>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
        </Info>
      </ContentContainer>
      <ButtonContainer>
        <Button fullWidth primary>
          Connect with {user.first_name}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default PostDetail;
