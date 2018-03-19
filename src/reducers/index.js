import { combineReducers } from "redux";

import foodAmount from "./foodAmount";
import foodGrowth from "./foodGrowth";
import maxPopulation from "./maxPopulation";
import population from "./population";
import turn from "./turn";
import selectedTile from "./selectedTile";

export default combineReducers({
  foodAmount,
  foodGrowth,
  maxPopulation,
  population,
  turn,
  selectedTile
});
