import { flatten } from "ramda";

import { combineReducers } from "redux";

import {
  addEventMessage,
  addPerson,
  createZombieHorde,
  selectTile,
  updateFoodAmount
} from "../actions";

import displayConquerForm from "./displayConquerForm";
import foodAmount from "./foodAmount";
import missions from "./missions";
import people from "./people";
import selectedTile from "./selectedTile";
import tiles from "./tiles";
import turn from "./turn";
import ui from "./ui";
import zombieHordes from "./zombieHordes";

// main reducer
const reducer = combineReducers({
  displayConquerForm,
  foodAmount,
  missions,
  people,
  selectedTile,
  tiles,
  turn,
  ui,
  zombieHordes
});

// thunks
export const processEndOfTurn = currentState => {
  return (dispatch, getState) => {
    // Add event messages for taken tiles
    const oldTakenTiles = currentState.tiles.filter(tile => tile.taken);
    const oldTakenTilesIds = oldTakenTiles.map(t => t.id);
    const newTakenTiles = getState().tiles.filter(tile => tile.taken);

    const tilesToAdd = newTakenTiles.filter(
      t => !oldTakenTilesIds.includes(t.id)
    );

    tilesToAdd.forEach(tile => {
      const message = `${tile.displayName} was conquered`;
      const messages = [message];

      // Add a person
      const undiscoveredPeople = getUndiscoveredPeople(currentState);
      const person = undiscoveredPeople.length && undiscoveredPeople[0];
      const personName =
        person && `${person.firstName} ${person.lastName} ${person.icon}`;
      const peopleMessage = `You found a survivor, ${personName}`;
      if (person) {
        dispatch(addPerson(person));
        messages.push(peopleMessage);
      }

      dispatch(addEventMessage(messages.join(". ")));
    });

    // Update the food amount
    // ...use currentState rather than getState as we only want to apply
    // the food growth _next_ turn
    const amount = getFoodGrowth(currentState);

    dispatch(updateFoodAmount(amount));
    if (currentState.foodAmount <= 1 && amount <= 0)
      dispatch(
        addEventMessage(
          "❌ There is no more food. People are passing out from hunger!"
        )
      );

    // Create zombie horde
    if (currentState.turn == 2) {
      dispatch(addEventMessage("A zombie horde is advancing!! 😱"));

      const position = { x: -1, y: -3 };
      dispatch(createZombieHorde(position));
    }

    // Handle zombie horde's movement
  };
};

export const processSelectTile = (tiles, tile) => {
  return (dispatch, getState) => {
    // Side effects for tile selection
    // TODO There should only be one select tile instead of one for each tile
    tiles.forEach(x => (x.displayTile.material.opacity = 0));
    tile.displayTile.material.opacity = 0.5;

    dispatch(selectTile(tile));
  };
};

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
  const netGrowth = grossGrowth - getDiscoveredPeople(state).length;
  return netGrowth;
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
export const getDiscoveredPeople = state => {
  return state.people.filter(p => p.discovered);
};

// selector for undiscovered people on missions
export const getUndiscoveredPeople = state => {
  return state.people.filter(p => !p.discovered);
};

// selector for people on missions
export const getPeopleOnMissions = state => {
  const activeMissions = getActiveMissions(state);
  const peopleInMissions = flatten(
    activeMissions.map(mission => mission.people)
  );
  const peopleInMissionsIds = peopleInMissions.map(person => person.id);
  return getDiscoveredPeople(state).filter(person =>
    peopleInMissionsIds.includes(person.id)
  );
};

// selector for available people
export const getAvailablePeople = state => {
  const activeMissions = getActiveMissions(state);
  const peopleInMissions = flatten(
    activeMissions.map(mission => mission.people)
  );

  const peopleInMissionsIds = peopleInMissions.map(person => person.id);

  return getDiscoveredPeople(state).filter(
    person => !peopleInMissionsIds.includes(person.id)
  );
};

export default reducer;
