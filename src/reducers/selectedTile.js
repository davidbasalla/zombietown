const selectedTile = (state = "No tile selected", action) => {
  switch (action.type) {
    case "SELECT_TILE":
      return (state = action.tileName);
    default:
      return state;
  }
};
export default selectedTile;
