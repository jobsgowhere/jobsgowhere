import format from "date-fns/esm/format";
import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/Button";
import { Menu, MenuItem, StyledMenuItem } from "../../components/Menu";
import { Modal } from "../../components/Modal";
import { setMessageDialog, showMessageDialog } from "../../components/useMessageDialog";
import { toast } from "../../components/useToast";
import Auth0Context from "../../contexts/Auth0";
import { usePost } from "../../contexts/Post";
import { useProfile } from "../../contexts/Profile";
import { CategoryTypes, FullProfile, MessageDialogParameters, PostInterface } from "../../types";
import {
  Actions,
  Avatar,
  AvatarImage,
  ContentContainer,
  Description,
  Headline,
  Info,
  InfoHeader,
  Name,
  PostLinks,
  Timestamp,
  Title,
} from "./PostComponents";

const Container = styled.div`
  background-color: white;
  border-radius: 0.875rem;
`;

const ButtonContainer = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

type PostDetailProps = {
  data: PostInterface;
  category: CategoryTypes;
};

const EditIcon = () => (
  <svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 4H3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 2.5a2.121 2.121 0 113 3L11 15l-4 1 1-4 9.5-9.5z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.438 4.313H8.25a.188.188 0 00.188-.188v.188h7.124v-.188c0 .103.085.188.188.188h-.188V6h1.688V4.125c0-.827-.673-1.5-1.5-1.5h-7.5c-.827 0-1.5.673-1.5 1.5V6h1.688V4.312zM20.25 6H3.75a.75.75 0 00-.75.75v.75c0 .103.084.188.188.188h1.415l.579 12.257c.038.8.698 1.43 1.498 1.43h10.64c.802 0 1.46-.628 1.498-1.43l.579-12.258h1.416A.188.188 0 0021 7.5v-.75a.75.75 0 00-.75-.75zm-3.11 13.688H6.86l-.567-12h11.414l-.567 12z"
      stroke="none"
      fill="#FE4A4A"
    />
  </svg>
);

const DangerText = styled.span`
  color: var(--color-red);
`;

const PostDetail: React.FC<PostDetailProps> = function (props) {
  const history = useHistory();
  const context = useProfile();
  const postContext = usePost();
  const auth0Context = React.useContext(Auth0Context);
  const [profile, setProfile] = React.useState<FullProfile>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [postToDelete, setPostToDelete] = React.useState<{ id: string; category: string } | null>(
    null,
  );

  React.useEffect(() => {
    if (context?.profile) {
      setProfile(context.profile);
    }
  }, [context]);
  const craftMessage = () => {
    if (!profile) {
      auth0Context?.send("LOGIN");
      return;
    }
    if (profile.status === "Incomplete") {
      toast("⚠️ Your profile is incomplete! Complete your profile to connect with another user.");
      return;
    }

    const messageDialogParameters: MessageDialogParameters = {
      /* eslint-disable @typescript-eslint/camelcase */
      title: "Contacting",
      id: props.data.id,
      job_poster: props.data.created_by,
      position: {
        job_title: props.data.title,
        placeholder: "Write your message here",
      },
      current_user: {
        id: profile.id,
        first_name: profile.firstName,
        last_name: profile.lastName,
        avatar_url: profile.picture,
        job_title: profile.headline,
        company: profile.company,
      },
      /* eslint-enable @typescript-eslint/camelcase */
    };
    setMessageDialog(messageDialogParameters);
    showMessageDialog(true);
  };

  const displayModal = (id: string, category: string) => {
    setPostToDelete({ id, category });
    setModalVisible(true);
  };

  const { data, category } = props;
  const { created_by: user } = data;

  const editPost = () => {
    postContext.setPost(data);
    postContext.setType(category);
    history.push("/posts/edit");
  };

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
              {context?.profile?.id === data.created_by.id && (
                <Menu>
                  <MenuItem as={StyledMenuItem} onSelect={editPost}>
                    <EditIcon />
                    Edit
                  </MenuItem>
                  <MenuItem as={StyledMenuItem} onSelect={() => displayModal(data.id, category)}>
                    <DeleteIcon />
                    <DangerText>Delete Post</DangerText>
                  </MenuItem>
                </Menu>
              )}
            </Actions>
          </InfoHeader>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
          <PostLinks data={data} />
          <Timestamp>{format(new Date(data.created_at), "dd MMM yyyy")}</Timestamp>
        </Info>
      </ContentContainer>
      <ButtonContainer>
        <Button fullWidth primary onClick={() => craftMessage()}>
          Connect with {user.first_name}
        </Button>
      </ButtonContainer>
      {modalVisible && postToDelete && (
        <Modal {...postToDelete} onHide={() => setModalVisible(false)} />
      )}
    </Container>
  );
};

export default PostDetail;
