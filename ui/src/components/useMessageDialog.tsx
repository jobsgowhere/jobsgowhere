import * as React from "react";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../components/Button";
import { InputErrorMessage, TextArea } from "../components/FormFields";
import { toast } from "../components/useToast";
import { SCREENS } from "../media";
import {
  Avatar,
  AvatarImage,
  ContentContainer,
  Headline,
  Info,
  InfoHeader,
  Name,
  Title,
} from "../shared/components/PostComponents";
import JobsGoWhereApiClient from "../shared/services/JobsGoWhereApiClient";
import { MessageDialogParameters } from "../types";

const Container = styled.div<{ active?: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ContentContainerNested = styled(ContentContainer)`
  border-radius: 0.875rem;
  box-shadow: 0.5625rem 0.5625rem 1rem rgba(163, 177, 198, 0.1),
    -0.5625rem -0.5625rem 1rem rgba(163, 177, 198, 0.1);
  margin-bottom: 1rem;
`;

const StyledMessageDialogHolder = styled.div`
  padding: 1rem 1.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  color: var(--color-grey-100);
  font-size: 1.125rem;
  border-radius: 0.875rem 0.875rem 0 0;

  ${SCREENS.Up.Tablet} {
    right: auto;
    left: 70%;
    width: 30rem;
    transform: translateX(-50%);
  }

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

const DialogTitle = styled.h2`
  font-size: 1rem;
  color: var(--color-darkblue);
`;

const CloseButton = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  align-self: center;
`;

let setMessageDialog: React.Dispatch<MessageDialogParameters>;
let showMessageDialog: React.Dispatch<boolean>;

type FormValues = {
  message: string;
};

const MessageDialogContainer = () => {
  const messageDialogRef = React.useRef<HTMLDivElement | null>(null);
  const parameters = {} as MessageDialogParameters;
  const [messageDialogParameters, setMessageDialogParameters] = React.useState(parameters);
  const [shouldShowDialog, setShowDialog] = React.useState(false);
  const { handleSubmit, register, errors, setValue } = useForm();

  setMessageDialog = setMessageDialogParameters;
  showMessageDialog = setShowDialog;
  React.useEffect(() => {
    const node = document.createElement("div");
    document.body.appendChild(node);
    messageDialogRef.current = node;
    register("message", {
      required: "Please enter a message",
      minLength: {
        value: 3,
        message: "Please enter a message with a minimum of 3 characters",
      },
    });
  }, [register]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const receiverId = messageDialogParameters.job_poster.id;
    const subject = `${messageDialogParameters.current_user.first_name} ${messageDialogParameters.current_user.last_name} connected with you`;
    const body = `Message from ${messageDialogParameters.current_user.first_name} ${messageDialogParameters.current_user.last_name}:\n${values.message}`;
    const postTitle = messageDialogParameters.position.job_title;
    JobsGoWhereApiClient.post(`${process.env.REACT_APP_API}/sendmessage`, {
      to: receiverId,
      subject,
      body,
      postTitle,
    })
      .then(() => {
        toast("👍 Good Job! Message Sent! Check your email for replies.");
        showMessageDialog(false);
      })
      .catch((err) => {
        toast(`❗️ Error: ${err.response.data.error_description}`);
      });
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue("message", event.target.value);
  };

  function markup() {
    if (!shouldShowDialog) return null;
    return (
      <StyledMessageDialogHolder>
        <HeaderContainer>
          <DialogTitle>{messageDialogParameters.title}</DialogTitle>
          <CloseButton onClick={() => setShowDialog(false)}>
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.064 8.315a.188.188 0 0 0-.188-.187l-1.546.007L12 10.912 9.673 8.137l-1.55-.007a.187.187 0 0 0-.187.188c0 .044.016.086.044.122l3.05 3.633-3.05 3.63a.188.188 0 0 0 .143.31l1.55-.008L12 13.228l2.327 2.775 1.547.007a.187.187 0 0 0 .188-.188.194.194 0 0 0-.045-.121l-3.044-3.63 3.049-3.634a.188.188 0 0 0 .042-.122z"
                fill="#3498DB"
              />
              <path
                d="M12 1.523c-5.798 0-10.5 4.702-10.5 10.5 0 5.799 4.702 10.5 10.5 10.5s10.5-4.701 10.5-10.5c0-5.798-4.702-10.5-10.5-10.5zm0 19.22a8.72 8.72 0 0 1-8.719-8.72A8.72 8.72 0 0 1 12 3.305a8.72 8.72 0 0 1 8.719 8.718A8.72 8.72 0 0 1 12 20.743z"
                fill="#3498DB"
              />
            </svg>
          </CloseButton>
        </HeaderContainer>
        <Container>
          <ContentContainerNested>
            <Avatar>
              <AvatarImage src={messageDialogParameters.job_poster.avatar_url} />
            </Avatar>
            <Info>
              <InfoHeader>
                <div>
                  <Name>
                    {messageDialogParameters.job_poster.first_name}{" "}
                    {messageDialogParameters.job_poster.last_name}
                  </Name>
                  <Headline>
                    {messageDialogParameters.job_poster.job_title} at{" "}
                    {messageDialogParameters.job_poster.company}
                  </Headline>
                </div>
              </InfoHeader>
              <Title>{messageDialogParameters.position.job_title}</Title>
            </Info>
          </ContentContainerNested>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextArea
              key={messageDialogParameters.id}
              placeholder={messageDialogParameters.position.placeholder}
              name="message"
              onChange={handleTextAreaChange}
              error={!!errors.message}
            />
            {errors.message ? (
              <InputErrorMessage>{errors.message.message}</InputErrorMessage>
            ) : null}
            <Button fullWidth primary>
              Send Message
            </Button>
          </form>
        </Container>
      </StyledMessageDialogHolder>
    );
  }

  if (!messageDialogRef.current) return null;
  return createPortal(markup(), messageDialogRef.current);
};

export { MessageDialogContainer, setMessageDialog, showMessageDialog };
