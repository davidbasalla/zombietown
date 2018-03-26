const tiles = (state = [], action) => {
  switch (action.type) {
    case "ADD_TILES":
      return (state = action.tiles);
    case "CONQUER_TILE":
      const unalteredTiles = state.filter(tile => tile != action.tile);
      const tile = state.find(tile => tile == action.tile);

      // By default add 2 turns to wait until it's conquered
      return [...unalteredTiles, Object.assign(tile, { conquerCounter: 2 })];
    case "END_TURN":
      const unalteredTiles2 = state.filter(tile => !tile.conquerCounter);
      const conqueringTiles = state
        .filter(tile => tile.conquerCounter)
        .map(tile => {
          if (tile.conquerCounter == 1) {
            // color tile as active
            tile.assets.forEach(asset => {
              asset.material.color.set(0xffffff);
            });

            // set taken to true
            return Object.assign(tile, {
              conquerCounter: tile.conquerCounter - 1,
              taken: true
            });
          } else {
            // count down the timer
            return Object.assign(tile, {
              conquerCounter: tile.conquerCounter - 1
            });
          }
        });

      return [...unalteredTiles2, ...conqueringTiles];
    default:
      return state;
  }
};
export default tiles;
