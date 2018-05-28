const tiles = (state = [], action) => {
  switch (action.type) {
    case "ADD_TILES":
      return (state = action.tiles);
    case "END_TURN":
      const conqueringMissions = action.activeMissions.filter(
        m => m.turnCounter == 1
      );
      if (conqueringMissions.length > 0) {
        const tilesToBeConquered = conqueringMissions.map(m => m.tile);
        const tilesToBeLeftAlone = state.filter(tile => {
          return tilesToBeConquered.indexOf(tile) == -1;
        });

        const conqueredTiles = tilesToBeConquered.map(tile => {
          tile.assets.forEach(asset => {
            asset.material.color.set(0xffffff);
          });

          return {
            ...tile,
            taken: true
          };
        });

        return [...tilesToBeLeftAlone, ...conqueredTiles];
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default tiles;
