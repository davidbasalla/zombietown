const multiplier = 23.4;

const zombieHordes = (state = [], action) => {
  switch (action.type) {
    case "CREATE_ZOMBIE_HORDE":
      const zombieHorde = {
        position: action.position,
        geo: action.geo
      };

      return [...state, zombieHorde];
    case "MOVE_ZOMBIE_HORDE":
      action.horde.position.x = action.position.x;
      action.horde.position.z = action.position.z;

      action.horde.geo.position.set(
        action.position.x * multiplier + 28,
        15,
        action.position.z * multiplier + 6
      );

      return state;
    default:
      return state;
  }
};
export default zombieHordes;
