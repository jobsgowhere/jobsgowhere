import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

export const StyledMenuList = styled.div`
  max-width: 12.5rem;
  background: #fff;
  border-radius: 0.875rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(163, 177, 198, 0.25);
  position: absolute;
  right: 0;
`;

type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
};

export const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;

  & + & {
    margin-top: 0.75rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
`;

const OverflowMenuButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <StyledButton ref={ref} onClick={props.onClick}>
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z"
        stroke="#23374D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </StyledButton>
));

export const Menu: React.FC = ({ children }) => {
  const [active, setActive] = React.useState(false);
  const btnRef = React.useRef(null);

  const handleWindowClick = (e: MouseEvent) => {
    if ((e.target as HTMLButtonElement).closest("button") !== btnRef.current) setActive(false);
  };

  React.useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.currentTarget === btnRef.current) setActive((val) => !val);
  };

  return (
    <Container>
      <OverflowMenuButton onClick={handleClick} ref={btnRef} />
      {active && React.Children.only(children)}
    </Container>
  );
};
