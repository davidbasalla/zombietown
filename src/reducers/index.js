import { combineReducers } from "redux";
import turn from "./turn";
import selectedTile from "./selectedTile";

export default combineReducers({
  turn,
  selectedTile
});
