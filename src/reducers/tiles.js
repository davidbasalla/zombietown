const isVisible = (tile, tiles) => {
  if (tile.taken == true) return true;

  const neighbours = getNeighbours(tile, tiles).filter(n => n);
  if (neighbours.find(t => t.taken == true)) return true;

  return false;
};

const getNeighbours = (tile, tiles) => {
  const tileX = tile.position.x;
  const tileZ = tile.position.z;

  const positions = [
    [tileX + 1, tileZ - 1],
    [tileX + 1, tileZ],
    [tileX + 1, tileZ + 1],
    [tileX, tileZ + 1],
    [tileX - 1, tileZ - 1],
    [tileX - 1, tileZ],
    [tileX - 1, tileZ + 1],
    [tileX, tileZ - 1]
  ];

  return positions.map(p => {
    return tiles.find(t => t.position.x == p[0] && t.position.z == p[1]);
  });
};

const tiles = (state = [], action) => {
  switch (action.type) {
    case "ADD_TILES":
      const tiles = action.tiles.map(tile => {
        const visible = isVisible(tile, action.tiles);
        if (visible) {
          tile.fogTile.material.opacity = 0.0;
        }

        return {
          ...tile,
          visible: visible
        };
      });

      return tiles;
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

        // UPDATE FOG OF WAR
        const updatedTiles = [...tilesToBeLeftAlone, ...conqueredTiles];
        const tilesWithVis = updatedTiles.map(tile => {
          const visible = isVisible(tile, updatedTiles);
          if (visible) {
            tile.fogTile.material.opacity = 0.0;
          }

          return {
            ...tile,
            visible: visible
          };
        });
        return tilesWithVis;
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default tiles;
