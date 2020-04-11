import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  fill: ${(props) => (props.active ? "var(--color-blue)" : "var(--color-grey-300)")};
  padding: 0.1875rem 0.125rem;
  outline: none;

  &:hover {
    fill: var(--color-blue);
  }

  svg {
    display: block;
  }
`;

type FavouriteButtonProps = {
  active?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
};

const FavouriteButton = ({ active = false, onClick }: FavouriteButtonProps) => (
  <StyledButton onClick={onClick} active={active}>
    <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
      {active ? (
        <path d="M20.633 4.647a6.093 6.093 0 0 0-1.334-1.94A6.219 6.219 0 0 0 14.93.93 6.26 6.26 0 0 0 11 2.315 6.26 6.26 0 0 0 7.07.93 6.219 6.219 0 0 0 2.7 2.706a6.057 6.057 0 0 0-1.825 4.33c0 .78.16 1.593.476 2.42.265.692.644 1.409 1.13 2.133.768 1.146 1.825 2.341 3.138 3.553a35.068 35.068 0 0 0 4.42 3.453l.556.356a.753.753 0 0 0 .808 0l.556-.357a35.517 35.517 0 0 0 4.42-3.452c1.312-1.211 2.37-2.407 3.138-3.553.485-.724.867-1.441 1.13-2.133.316-.827.476-1.64.476-2.42a5.968 5.968 0 0 0-.49-2.39z" />
      ) : (
        <path d="M21.534 3.924a6.349 6.349 0 00-1.389-2.022 6.478 6.478 0 00-4.55-1.85A6.52 6.52 0 0011.5 1.495 6.52 6.52 0 007.406.052a6.478 6.478 0 00-4.551 1.85 6.31 6.31 0 00-1.902 4.51c0 .813.166 1.66.496 2.522.276.72.671 1.467 1.176 2.221.801 1.194 1.902 2.44 3.27 3.702 2.265 2.092 4.509 3.537 4.604 3.596l.579.37a.784.784 0 00.842 0l.579-.37a37.02 37.02 0 004.604-3.596c1.367-1.263 2.468-2.508 3.27-3.702.504-.754.902-1.501 1.176-2.221.33-.862.495-1.71.495-2.522.003-.862-.17-1.7-.51-2.488zM11.5 16.893s-8.691-5.57-8.691-10.481c0-2.488 2.058-4.505 4.597-4.505A4.61 4.61 0 0111.5 4.358a4.61 4.61 0 014.094-2.45c2.54 0 4.597 2.016 4.597 4.504 0 4.912-8.691 10.48-8.691 10.48z" />
      )}
    </svg>
  </StyledButton>
);

export default FavouriteButton;
