import * as React from "react";
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import Button from "../components/Button";
// import JobsGoWhereApiClient from "../shared/services/JobsGoWhereApiClient";

const delay = 300

// const Container = styled.div<{ active?: boolean }>`
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: stretch;
//   width: 100%;
//   background-color: white;
//   border-radius: 0.875rem;
//   padding: 1.5rem;
//   animation: modal-animation ${delay}ms ease-in-out;

//   @keyframes modal-animation {
//     0% {
//       transform: translateY(30px);
//       opacity: 0;
//     }
//     5% {
//       transform: translateY(0);
//       opacity: 1;
//     }
//     95% {
//       transform: translateY(0);
//       opacity: 1;
//     }
//     100% {
//       opacity: 0;
//       transform: translateY(-30px);
//     }
//   }
// `;

const Container = styled.div`
  width: 100%;
  height: 400px;
  background-color: white;
`

let showModal: React.Dispatch<boolean>;

const ModalContainer = () => {
  const modalRef = React.useRef < HTMLDivElement | null > (null)
  const [shouldShowModal, setShowModal] = React.useState(false)
  showModal = setShowModal
  React.useEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    modalRef.current = node
  }, [])

  function markup () {
    if(!shouldShowModal) return null;
    return (
      <Container>
        <p>Bananas are good for health</p>
        <Button onClick={()=> setShowModal(false)}>
          Cancel
        </Button>
        {/* <Button primary onClick={()=> handleDeletePost(data.id)}>Delete</Button> */}
        <Button primary>Delete</Button>
      </Container>
    )
  }

  if (!modalRef.current) return null
  return createPortal(markup(), modalRef.current)
}

export { ModalContainer, showModal }
