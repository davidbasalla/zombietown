const turn = (state = [], action) => {
  switch (action.type) {
    case "ADD_TURN":
      return (state += 1);
    default:
      return state;
  }
};
export default turn;
