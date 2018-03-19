const foodGrowth = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_FOOD_GROWTH":
      console.log("WHHAT");
      console.log(action);
      return (state = action.foodGrowth);
    default:
      return state;
  }
};
export default foodGrowth;
