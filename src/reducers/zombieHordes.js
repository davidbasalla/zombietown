const multiplier = 23.4;

const zombieHordes = (state = [], action) => {
  switch (action.type) {
    case "CREATE_ZOMBIE_HORDE":
      const zombieHorde = {
        position: action.position,
        geos: action.geos
      };

      return [...state, zombieHorde];
    case "MOVE_ZOMBIE_HORDE":
      action.horde.position.x = action.position.x;
      action.horde.position.z = action.position.z;

      const iconTile = action.horde.geos[0];
      const redTile = action.horde.geos[1];

      iconTile.position.set(
        action.position.x * multiplier + 28,
        15,
        action.position.z * multiplier + 6
      );

      redTile.position.set(
        action.position.x * multiplier + 0.5,
        0.6,
        action.position.z * multiplier + 1
      );

      return state;
    case "REMOVE_ZOMBIE_HORDE":
      const filteredZombieHordes = state.filter(
        horde => horde !== action.horde
      );

      return [filteredZombieHordes];
    default:
      return state;
  }
};
export default zombieHordes;
