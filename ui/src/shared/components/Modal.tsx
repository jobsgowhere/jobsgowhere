import * as React from "react";
import { createPortal } from 'react-dom'
import styled from 'styled-components'
// import JobsGoWhereApiClient from "../shared/services/JobsGoWhereApiClient";

const delay = 300

const Container = styled.div<{ active?: boolean }>`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  background-color: white;
  border-radius: 0.875rem;
  padding: 1.5rem;
  animation: modal-animation ${delay}ms ease-in-out;

  @keyframes modal-animation {
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
`

const CloseButton = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  align-self: center;
`;

let showModalDialog: React.Dispatch<boolean>;

const Modal = () => {
  const modalRef = React.useRef < HTMLDivElement | null > (null)
  const [shouldShowModal, setShowModal] = React.useState(false)
  showModalDialog = setShowModal
  React.useEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    modalRef.current = node
  }, [])

  function markup () {
    if(!shouldShowModal) return null;
    return (
      <Container>
        <p>Bananas</p>
        <CloseButton onClick={()=> setShowModal(false)}>
          Cancel
        </CloseButton>
      </Container>
    )
  }

  if (!modalRef.current) return null
  return createPortal(markup(), modalRef.current)
}

export { Modal, showModalDialog }
