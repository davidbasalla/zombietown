import { combineReducers } from "redux";

import foodAmount from "./foodAmount";
import maxPopulation from "./maxPopulation";
import population from "./population";
import turn from "./turn";
import selectedTile from "./selectedTile";
import tiles from "./tiles";

export default combineReducers({
  foodAmount,
  maxPopulation,
  population,
  turn,
  selectedTile,
  tiles
});
