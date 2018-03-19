const maxPopulation = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_MAX_POPULATION":
      return (state = action.maxPopulation);
    default:
      return state;
  }
};
export default maxPopulation;
