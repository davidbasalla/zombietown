const displayConquerForm = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_CONQUER_FORM":
      return !state;
    default:
      return state;
  }
};
export default displayConquerForm;
