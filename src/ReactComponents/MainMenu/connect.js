import { connect } from "react-redux";
import { endTurn, toggleForm } from "../../actions";
import {
  getActiveMissions,
  getFoodGrowth,
  getMaxPopulation
} from "../../reducers";

const mapStateToProps = state => {
  const missionForSelectedTile = getActiveMissions(state).find(
    mission => state.selectedTile == mission.tile
  );

  return {
    turn: state.turn,
    selectedTile: state.selectedTile,
    missionForSelectedTile: missionForSelectedTile,
    currentPopulation: state.population,
    maxPopulation: getMaxPopulation(state),
    food: state.foodAmount,
    foodGrowth: getFoodGrowth(state),
    showConquerButton: !state.selectedTile.taken && !missionForSelectedTile,
    displayConquerForm: state.displayConquerForm,
    activeMissions: getActiveMissions(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    endTurnAction: activeMissions => dispatch(endTurn(activeMissions)),
    toggleFormAction: () => dispatch(toggleForm())
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
