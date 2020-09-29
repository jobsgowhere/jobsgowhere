import * as React from "react";
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import Button from "../components/Button";
import { toast } from "../components/useToast"
import JobsGoWhereApiClient from "../shared/services/JobsGoWhereApiClient";

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`

const ModalContainer = styled.div`
  width: 368px;
  height: auto;
  background-color: white;
  margin: 0 auto;
  border-radius: 14px;
  padding: 1rem;
`

const ModalTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.625rem 0 0 0;
  text-align: center;
`

const ModalDescription = styled.p`
  font-size: 1rem;
  line-height: 1.375rem;
  margin: 1rem 0;
  text-align: center;
`

const Buttons = styled.div`
  display: flex;
  margin-top: 0.5rem;
  ${Button} + ${Button} {
    margin-left: 1rem;
  }
`;

let showModal: React.Dispatch<boolean>;
let postToDelete: React.Dispatch<string>;
let postCategory: React.Dispatch<string>;

const handleDeletePost = async (id: string, category: string) => {
  try {
    await JobsGoWhereApiClient({
      url: `${process.env.REACT_APP_API}/${category}byid/${id}`,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      }
    });
    toast("✨ Poof! We deleted the post for you! ")
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error.toJSON());
    toast("😭 There was an error deleting your post.")
    throw error;
  }
}

const Modal = () => {
  const modalRef = React.useRef < HTMLDivElement | null > (null)
  const [shouldShowModal, setShowModal] = React.useState(false)
  const [postID, setPostID] = React.useState("")
  const [category, setCategory] = React.useState("")
  showModal = setShowModal
  postToDelete = setPostID
  postCategory = setCategory
  React.useEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    modalRef.current = node
  }, [])

  function markup () {
    if (!shouldShowModal) return null;
    return (
      <ModalBackground>
        <ModalContainer>
          <ModalTitle>Delete Post</ModalTitle>
          <ModalDescription>Posts that are deleted can never be recovered. Do you want to continue?</ModalDescription>
          <Buttons>
            <Button fullWidth onClick={() => setShowModal(false)}>Cancel</Button>
            <Button fullWidth primary onClick={() => { setShowModal(false); handleDeletePost(postID, category)}}>Delete</Button>
          </Buttons>
        </ModalContainer>
      </ModalBackground>
    )
  }

  if (!modalRef.current) return null
  return createPortal(markup(), modalRef.current)

}

export { Modal, showModal, postToDelete, postCategory }
