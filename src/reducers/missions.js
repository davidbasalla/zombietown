const missions = (state = [], action) => {
  switch (action.type) {
    case "CONQUER_TILE":
      const mission = {
        people: action.people,
        turnCounter: 3, //default
        type: "MISSION_CONQUER_TILE",
        tile: action.tile
      };

      return [...state, mission];
    case "END_TURN":
      // add a chance to fail here!
      // calc the probability of success
      // fail mission, maybe even kill a person

      const updatedMissions = state.map(mission => ({
        ...mission,
        turnCounter: mission.turnCounter > 0 ? mission.turnCounter - 1 : 0
      }));
      return updatedMissions;
    default:
      return state;
  }
};
export default missions;
