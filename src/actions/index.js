export const endTurn = () => ({
  type: "END_TURN"
});

export const selectTile = tileName => ({
  type: "SELECT_TILE",
  tileName
});

export const addTiles = tiles => ({
  type: "ADD_TILES",
  tiles
});

export const conquer = tile => ({
  type: "CONQUER_TILE",
  tile
});

export const toggleForm = () => ({
  type: "TOGGLE_CONQUER_FORM"
});

export const cancel = () => ({
  type: "CANCEL"
});

export const updatePersonOnConquerForm = person => ({
  type: "UPDATE_PERSON_ON_CONQUER_FORM",
  person
});
