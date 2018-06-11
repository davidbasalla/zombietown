const foodAmount = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_FOOD_AMOUNT":
      return (state += action.foodAmount);
    default:
      return state;
  }
};
export default foodAmount;
