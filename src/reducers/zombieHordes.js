const zombieHordes = (state = [], action) => {
  switch (action.type) {
    case "CREATE_ZOMBIE_HORDE":
      const zombieHorde = {
        position: action.position
      };

      return [...state, zombieHorde];
    default:
      return state;
  }
};
export default zombieHordes;
