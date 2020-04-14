import React from "react";

import Main from "../../components/Main";

type FavouritesScreenProps = {};

function FavouritesScreen(props: FavouritesScreenProps) {
  return (
    <Main>
      <Main.Col>
        <h1>Favourite Posts</h1>
      </Main.Col>
      <Main.Col>post detail</Main.Col>
    </Main>
  );
}

export default FavouritesScreen;
