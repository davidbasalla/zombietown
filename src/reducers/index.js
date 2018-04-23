import { combineReducers } from "redux";

import displayConquerForm from "./displayConquerForm";
import foodAmount from "./foodAmount";
import people from "./people";
import population from "./population";
import selectedTile from "./selectedTile";
import tiles from "./tiles";
import turn from "./turn";

// main reducer
const reducer = combineReducers({
  displayConquerForm,
  foodAmount,
  people,
  population,
  selectedTile,
  tiles,
  turn
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

export default reducer;
