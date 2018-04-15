export const endTurn = () => ({
  type: "END_TURN"
});

export const selectTile = tileName => ({
  type: "SELECT_TILE",
  tileName
});

export const updateMaxPopulation = maxPopulation => ({
  type: "UPDATE_MAX_POPULATION",
  maxPopulation
});

export const addTiles = tiles => ({
  type: "ADD_TILES",
  tiles
});

export const conquer = tile => ({
  type: "CONQUER_TILE",
  tile
});
