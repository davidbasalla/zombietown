const foodGrowth = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_FOOD_GROWTH":
      const addFoodGrowth = (total, element) => {
        const amount = element.resourceAttributes.foodGrowth
          ? element.resourceAttributes.foodGrowth
          : 0;
        return (total += amount);
      };

      const grossGrowth = action.takenTiles.reduce(addFoodGrowth, 0);
      const netGrowth = grossGrowth - action.population;

      return (state = netGrowth);
    default:
      return state;
  }
};
export default foodGrowth;
