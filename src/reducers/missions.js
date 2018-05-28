const missions = (state = [], action) => {
  switch (action.type) {
    case "CONQUER_TILE":
      // figure out what happens to each mission

      const mission = {
        people: action.people,
        turnCounter: 2,
        type: "MISSION_CONQUER_TILE",
        tile: action.tile
      };

      return [...state, mission];
    case "END_TURN":
      // figure out what happens to each mission
      // if counter goes to 0, do the thing, remove the mission
      return state;
    default:
      return state;
  }
};
export default missions;
