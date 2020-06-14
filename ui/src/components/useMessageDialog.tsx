import axios from "axios";
import * as React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Button from "../components/Button";
import {
  ContentContainer,
  Avatar,
  Info,
  InfoHeader,
  Name,
  Headline,
  Title,
  AvatarImage,
} from "../shared/components/PostComponents";
import { MessageDialogParameters } from "../types";

const delay = 4000;

const Container = styled.div<{ active?: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  /* height: 172px; */
  background-color: white;
  border-radius: 0.875rem;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  padding: 0.5rem;
`;

const ButtonContainer = styled.div`
  padding: 1rem 1.5rem 1.75rem 0.75rem;
`;

const TextArea = styled.textarea`
  margin: 1rem;
  border-radius: 0.875rem;
`;

const StyledMessageDialogHolder = styled.div`
  background-color: white;
  color: var(--color-grey-100);
  font-size: 1.125rem;
  border-radius: 0.875rem;
  position: fixed;
  bottom: 2.75rem;
  left: 70%;
  transform: translateX(-50%);
  // animation: toast-animation ${delay}ms ease-in-out forwards;

  @keyframes toast-animation {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    5% {
      transform: translateY(0);
      opacity: 1;
    }
    95% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-30px);
    }
  }
`;

let setMessageDialog: React.Dispatch<MessageDialogParameters>;
let showMessageDialog: React.Dispatch<boolean>;

const MessageDialogContainer = () => {
  const messageDialogRef = React.useRef<HTMLDivElement | null>(null);
  const parameters = {} as MessageDialogParameters;
  const [messageDialogParameters, setMessageDialogParameters] = React.useState(parameters);
  const [shouldShowDialog, setShowDialog] = React.useState(false);
  let message = messageDialogParameters.position ? messageDialogParameters.position.placeholder : '';
  setMessageDialog = setMessageDialogParameters;
  showMessageDialog = setShowDialog;
  React.useEffect(() => {
    const node = document.createElement("div");
    document.body.appendChild(node);
    messageDialogRef.current = node;
  }, []);

  const postMessage = () => {
    const senderId = messageDialogParameters.current_user.id;
    const receiverId = messageDialogParameters.job_poster.id;
    const subject = `${messageDialogParameters.current_user.first_name} ${messageDialogParameters.current_user.last_name} connected with you`;
    const body = `Message from ${messageDialogParameters.current_user.first_name} ${messageDialogParameters.current_user.last_name}:\n${message}`;
    console.log('to post message', senderId, receiverId, subject, body);
    // axios.post(`${process.env.REACT_APP_API}/sendmessage`, { from: senderId, to: receiverId, subject, body }).then(res => {
    //   console.log(res);
    // })
  }

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    message = event.target.value;
  }

  function markup() {
    if (!shouldShowDialog) return null;
    return <StyledMessageDialogHolder>
      <HeaderContainer>
        <Title>{messageDialogParameters.title}</Title>
        <Button onClick={() => setShowDialog(false)}>X</Button>
      </HeaderContainer>
      <Container>
        <ContentContainer>
          <Avatar>
            <AvatarImage src={messageDialogParameters.job_poster.avatar_url} />
          </Avatar>
          <Info>
            <InfoHeader>
              <div>
                <Name>
                  {messageDialogParameters.job_poster.first_name} {messageDialogParameters.job_poster.last_name}
                </Name>
                <Headline>
                  {messageDialogParameters.job_poster.job_title} at {messageDialogParameters.job_poster.company}
                </Headline>
              </div>
            </InfoHeader>
            <Title>{messageDialogParameters.position.job_title}</Title>
          </Info>
        </ContentContainer>
        <TextArea placeholder={messageDialogParameters.position.placeholder} onChange={handleTextAreaChange} />
        <ButtonContainer>
          <Button fullWidth primary onClick={() => postMessage()}>
            Send Message
          </Button>
        </ButtonContainer>
      </Container>
    </StyledMessageDialogHolder>
  }

  if (!messageDialogRef.current) return null;
  return createPortal(markup(), messageDialogRef.current);
};

export { MessageDialogContainer, setMessageDialog, showMessageDialog };