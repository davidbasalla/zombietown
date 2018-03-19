const population = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_POPULATION":
      return (state = action.population);
    default:
      return state;
  }
};
export default population;
