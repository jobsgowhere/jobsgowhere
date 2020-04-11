import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import FavouriteButton from "../../../components/FavouriteButton";
import { PostInterface } from "../../../types";

const Container = styled.div<{ active?: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  /* height: 172px; */
  background-color: white;
  border-radius: 0.875rem;
  overflow: hidden;

  & + & {
    margin-top: 1rem;
  }

  &::before {
    content: "";
    width: 0.75rem;
    background-color: ${(props) => (props.active ? "var(--color-blue)" : "transparent")};
    flex: 0 0 auto;
  }
`;

const ContentContainer = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  padding-left: 0.8125rem;
`;

const Avatar = styled.div`
  flex: 0 0 auto;
  margin-right: 1.375rem;
`;

const Info = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

const InfoHeader = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const Actions = styled.div`
  margin-left: auto;
`;

const Name = styled.h2`
  font-size: 1rem;
  margin: 0.25rem 0;
`;

const Headline = styled.h3`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-grey-300);
`;

const Description = styled.div`
  margin-bottom: 1rem;
  font-size: 1.125rem;
  line-height: 1.4;
`;
const Timestamp = styled.div`
  margin-top: auto;
  font-size: 0.875rem;
  color: var(--color-grey-300);
`;

const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

type PostProps = {
  key?: string;
  active?: boolean;
  data: PostInterface;
  onClick?: () => void;
  handleFavouriteToggle?(event: React.MouseEvent<HTMLButtonElement>): void;
};

function Post(props: PostProps) {
  const { active, data, onClick, handleFavouriteToggle } = props;
  return (
    <Link to={`/jobs/${data.id}`}>
      <Container active={active} onClick={onClick}>
        <ContentContainer>
          <Avatar>
            <AvatarImage src="https://api.adorable.io/avatars/64/abott@adorable.png" />
          </Avatar>
          <Info>
            <InfoHeader>
              <div>
                <Name>Arthur Simmmons</Name>
                <Headline>Talent Hunter at ABCDEF company</Headline>
              </div>
              <Actions>
                <FavouriteButton active={data.favourite} onClick={handleFavouriteToggle} />
              </Actions>
            </InfoHeader>
            <Description>{data.title}</Description>
            <Timestamp>Today · You have connected</Timestamp>
          </Info>
        </ContentContainer>
      </Container>
    </Link>
  );
}

export default Post;
