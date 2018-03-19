const tiles = (state = [], action) => {
  switch (action.type) {
    case "ADD_TILES":
      return (state = action.tiles);
    case "CONQUER_TILE":
      const unalteredTiles = state.filter(tile => tile != action.tile);
      const tile = state.find(tile => tile == action.tile);

      // By default add 2 turns to wait until it's conquered
      return [...unalteredTiles, Object.assign(tile, { conquerCounter: 2 })];
    default:
      return state;
  }
};
export default tiles;
