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

      action.horde.geos[0].position.set(
        action.position.x * multiplier + 28,
        15,
        action.position.z * multiplier + 6
      );

      action.horde.geos[1].position.set(
        action.position.x * multiplier + multiplier / 2,
        0,
        action.position.z * multiplier - multiplier / 2
      );

      return state;
    default:
      return state;
  }
};
export default zombieHordes;
