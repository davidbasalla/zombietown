import { flatten } from "ramda";

import { combineReducers } from "redux";

import displayConquerForm from "./displayConquerForm";
import foodAmount from "./foodAmount";
import missions from "./missions";
import people from "./people";
import population from "./population";
import selectedTile from "./selectedTile";
import tiles from "./tiles";
import turn from "./turn";
import ui from "./ui";

// main reducer
const reducer = combineReducers({
  displayConquerForm,
  foodAmount,
  missions,
  people,
  population,
  selectedTile,
  tiles,
  turn,
  ui
});

// selector for food growth
export const getFoodGrowth = state => {
  const addFoodGrowth = (total, tile) => {
    const amount = tile.resourceAttributes.foodGrowth
      ? tile.resourceAttributes.foodGrowth
      : 0;
    return (total += amount);
  };

  const takenTiles = state.tiles.filter(tile => tile.taken);
  const grossGrowth = takenTiles.reduce(addFoodGrowth, 0);
  const netGrowth = grossGrowth - state.population;

  return `${netGrowth >= 0 ? "+" : "-"}${netGrowth}`;
};

// selector for max population
export const getMaxPopulation = state => {
  const takenTiles = state.tiles.filter(tile => tile.taken);

  const addPopulationSpace = (total, tile) => {
    const amount = tile.resourceAttributes.populationSpace
      ? tile.resourceAttributes.populationSpace
      : 0;
    return (total += amount);
  };

  return takenTiles.reduce(addPopulationSpace, 0);
};

// selector for active missions
export const getActiveMissions = state =>
  state.missions.filter(
    mission => mission.turnCounter && mission.turnCounter > 0
  );

// selector for people on missions
export const getPeopleOnMissions = state => {
  const activeMissions = getActiveMissions(state);
  const peopleInMissions = flatten(
    activeMissions.map(mission => mission.people)
  );
  const peopleInMissionsIds = peopleInMissions.map(person => person.id);
  return state.people.filter(person => peopleInMissionsIds.includes(person.id));
};

// selector for available people
export const getAvailablePeople = state => {
  const activeMissions = getActiveMissions(state);
  const peopleInMissions = flatten(
    activeMissions.map(mission => mission.people)
  );

  const peopleInMissionsIds = peopleInMissions.map(person => person.id);

  return state.people.filter(
    person => !peopleInMissionsIds.includes(person.id)
  );
};

export default reducer;
