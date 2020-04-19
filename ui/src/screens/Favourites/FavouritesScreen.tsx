import React from "react";

import { Main, Col, DetailCol } from "../../components/Main";

const FavouritesScreen: React.FC = function () {
  return (
    <Main>
      <Col>
        <h1>Favourite Posts</h1>
      </Col>
      <DetailCol>post detail</DetailCol>
    </Main>
  );
};

export default FavouritesScreen;
