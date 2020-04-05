import React from "react";

import Main from "../../components/Main";

type FavouriteScreenProps = {};

function FavouriteScreen(props: FavouriteScreenProps) {
  return (
    <Main>
      <Main.Col>
        <h1>Favourite Posts</h1>
      </Main.Col>
      <Main.Col>post detail</Main.Col>
    </Main>
  );
}

export default FavouriteScreen;
