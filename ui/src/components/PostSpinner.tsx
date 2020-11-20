import * as React from "react";
import styled from "styled-components";
import MoonLoader from "react-spinners/MoonLoader";

const LoaderBlock = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoaderText = styled.span`
  display: block;
  margin-top: 1rem;
  color: var(--color-darkblue);
  font-weight: 600;
`;

const PostSpinner: React.FC = function () {
  return (
    <LoaderBlock>
      <MoonLoader color={"#3498db"} />
      <LoaderText>Loading...</LoaderText>
    </LoaderBlock>
  );
};

export default PostSpinner;
