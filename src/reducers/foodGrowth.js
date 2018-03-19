const foodGrowth = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_FOOD_GROWTH":
      return (state = action.foodGrowth);
    default:
      return state;
  }
};
export default foodGrowth;
