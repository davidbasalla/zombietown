export const addTurn = () => ({
  type: "ADD_TURN"
});

export const selectTile = tileName => ({
  type: "SELECT_TILE",
  tileName
});
