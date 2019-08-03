import { omit } from "ramda";

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

    case "CONQUER_TILE":
      const updatedTile = {
        ...action.tile,
        hourglassIcon: action.hourglassIcon
      };

      const unchangedTiles = action.tiles.filter(
        tile => tile.id !== updatedTile.id
      );
      return [...unchangedTiles, updatedTile];

    case "LOSE_TILE":
      const tileToLose = {
        ...action.tile,
        taken: false
      };

      const remaingingTiles = action.tiles.filter(
        tile => tile.id !== tileToLose.id
      );

      // UPDATE FOG OF WAR
      // TODO - Refactor the code as it's duplicate
      const updatedTilesX = [...remaingingTiles, tileToLose];
      const tilesWithVisX = updatedTilesX.map(tile => {
        const visible = isVisible(tile, updatedTilesX);
        const opac = visible ? 0.0 : 0.75;
        tile.fogTile.material.opacity = opac;

        return {
          ...tile,
          visible: visible
        };
      });
      return tilesWithVisX;

    case "END_TURN":
      const conqueringMissions = action.activeMissions.filter(
        m => m.turnCounter == 1
      );
      if (conqueringMissions.length > 0) {
        // TODO should only store a tile id and not the whole tile object in activeMissions
        // because of problems with the tile object changing in other redux actions...
        const tileIds = conqueringMissions.map(m => m.tile.id);
        const tilesToBeConquered = tileIds.map(tId =>
          state.find(t => t.id === tId)
        );
        const tilesToBeLeftAlone = state.filter(tile => {
          return tilesToBeConquered.map(t => t.id).indexOf(tile.id) == -1;
        });

        const conqueredTiles = tilesToBeConquered.map(tile => {
          tile.assets.forEach(asset => {
            asset.material.color.set(0xffffff);
          });

          // Remove the hour glass icon object from the render scene
          tile.hourglassIcon && action.scene.remove(tile.hourglassIcon);

          // Remove the hour glass icon object from Redux state
          const tileWithoutHourGlass = omit(["hourglassIcon"], tile);

          return {
            ...tileWithoutHourGlass,
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
