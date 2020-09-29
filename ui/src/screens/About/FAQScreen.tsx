import * as React from "react";
import styled from "styled-components";
import { MainSingle } from "../../components/Main";

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const FAQScreen: React.FC = function () {
  return (
    <MainSingle>
      <Title>Frequently Asked Questions</Title>
    </MainSingle>
  );
};

export default FAQScreen;
