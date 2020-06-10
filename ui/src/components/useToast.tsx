import * as React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const delay = 4000;

const StyledToastHolder = styled.div`
  background-color: var(--color-darkblue);
  color: var(--color-grey-100);
  font-size: 1.125rem;
  border-radius: 0.875rem;
  padding: 0.75rem 1.25rem;
  position: fixed;
  bottom: 2.75rem;
  left: 50%;
  transform: translateX(-50%);
  animation: toast-animation ${delay}ms ease-in-out forwards;

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

let toast: React.Dispatch<string>;

const ToastContainer = () => {
  const toastRef = React.useRef<HTMLDivElement | null>(null);
  const [text, setText] = React.useState("");
  toast = setText;
  React.useEffect(() => {
    const node = document.createElement("div");
    document.body.appendChild(node);
    toastRef.current = node;
  }, []);

  React.useEffect(() => {
    if (!text) return;
    const timeout = setTimeout(() => {
      setText("");
    }, delay);
    return () => clearTimeout(timeout);
  }, [text]);

  function markup() {
    if (!text) return null;
    return <StyledToastHolder>{text}</StyledToastHolder>;
  }

  if (!toastRef.current) return null;
  return createPortal(markup(), toastRef.current);
};

export { ToastContainer, toast };
