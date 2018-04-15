import { combineReducers } from "redux";

import foodAmount from "./foodAmount";
import maxPopulation from "./maxPopulation";
import population from "./population";
import turn from "./turn";
import selectedTile from "./selectedTile";
import tiles from "./tiles";

// main reducer
const reducer = combineReducers({
  foodAmount,
  maxPopulation,
  population,
  turn,
  selectedTile,
  tiles
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

export default reducer;
