import * as React from "react";
import styled from "styled-components";

import { SCREENS } from "../../media";

type SearchProps = {
  onChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
};

const Container = styled.label`
  grid-area: header-left;
  display: flex;
  align-items: center;
  border-radius: 0.875rem;
  background: #fff;
  ${SCREENS.Down.Tablet} {
    padding: 0 1rem;
  }
`;

const StyledSearch = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1rem;
  border: none;
  box-shadow: none;

  &:focus {
    outline: none;
  }
`;

const Country = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid var(--color-grey-200);
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem 0.25rem 0.5rem;

  span {
    margin-left: 0.5rem;
  }
`;

const IconContainer = styled.i`
  padding: 0 1rem;
  pointer-events: none;
  svg {
    fill: var(--color-grey-300);
  }
`;

const SearchIcon = () => (
  <IconContainer>
    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.325 12.899l5.38 5.38a1.009 1.009 0 11-1.427 1.426l-5.38-5.38a8 8 0 111.426-1.426h.001zM8 14A6 6 0 108 2a6 6 0 000 12z"
      />
    </svg>
  </IconContainer>
);

const SingaporeFlag = () => (
  <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15.5c4.15 0 7.5-3.35 7.5-7.5H.5c0 4.15 3.35 7.5 7.5 7.5z" fill="#EEE" />
    <path d="M8 .5A7.49 7.49 0 00.5 8h15C15.5 3.85 12.15.5 8 .5z" fill="#FE4A4A" />
    <path
      d="M5.3 4.375l-.3-.25h.375L5.5 3.75l.125.375H6l-.3.25.1.375-.3-.225-.3.225.1-.375zM7.3 4.375l-.3-.25h.375L7.5 3.75l.125.375H8l-.3.25.1.375-.3-.225-.3.225.1-.375zM5.55 5.625l-.3-.25h.375L5.75 5l.125.375h.375l-.3.25.1.375-.3-.225-.3.225.1-.375zM7.05 5.625l-.3-.25h.375L7.25 5l.125.375h.375l-.3.25.1.375-.3-.225-.3.225.1-.375zM6.3 3.625l-.3-.25h.375L6.5 3l.125.375H7l-.3.25.1.375-.3-.225L6.2 4l.1-.375z"
      fill="#EEE"
    />
    <path
      d="M6.1 7C4.9 7 3.95 5.975 3.95 4.725S4.925 2.45 6.1 2.45c.1 0 .175 0 .25.025a2.15 2.15 0 00-.975-.225C4.075 2.25 3 3.375 3 4.75s1.075 2.5 2.375 2.5c.4 0 .8-.1 1.125-.3-.125.025-.25.05-.4.05z"
      fill="#EEE"
    />
  </svg>
);

const Search: React.FC<SearchProps> = function (props) {
  const {onChange} = props;
  return (
    <Container>
      <SearchIcon />
      <StyledSearch placeholder="Search job postings" onChange={onChange}/>
      <Country>
        <SingaporeFlag />
        <span>Singapore</span>
      </Country>
    </Container>
  );
};

export default Search;
