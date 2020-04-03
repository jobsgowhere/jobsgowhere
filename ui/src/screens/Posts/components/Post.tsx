import * as React from "react";
import styled from 'styled-components';

const Container = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  height: 172px;
  margin: 5px;
  background-color: white;
  border-radius: 14px;
  overflow: hidden;
`;

type SelectionIndicatorProps = {
  active: boolean,
};
const SelectionIndicator = styled.div`
  width: 12px;
  background-color: ${(props: SelectionIndicatorProps) => props.active ? 'var(--color-blue)' : 'transparent'}
`;

const ContentContainer = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  margin: 15px;
`;

const Avatar = styled.div`
  flex: 0 0 auto;
  width: 100px;
`;

const Info = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  flex: 0 0 auto;
  width: 100px;
`;

const Name = styled.div`
  font-size: 1rem;
`;

const Headline = styled.div`
  font-size: 0.8rem;
`

const Description = styled.div`
  font-size: 1.2rem;
`;
const Timestamp = styled.div`
  font-size: 0.6rem;
`;

const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

type PostProps = {
  active: boolean,
};

function Post(props: PostProps) {
  const { active } = props;
  return (
    <Container>
      <SelectionIndicator active={active} />
      <ContentContainer>
        <Avatar>
          <AvatarImage src="https://api.adorable.io/avatars/64/abott@adorable.png" />
        </Avatar>
        <Info>
          <Name>Arthur Simmmons</Name>
          <Headline>Talent Hunter at ABCDEF company</Headline>
          <Description>I’m hiring iOS Developer with Swift experiences </Description>
          <Timestamp>Today · You have connected</Timestamp>
        </Info>
      </ContentContainer>
      <Actions>
        Action buttons goes here…
      </Actions>
    </Container>
  );
}

export default Post;
