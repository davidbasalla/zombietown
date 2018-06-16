import { connect } from "react-redux";
import { endTurn, toggleForm } from "../../actions";
import { processEndOfTurn } from "../../reducers";
import {
  getActiveMissions,
  getFoodGrowth,
  getMaxPopulation
} from "../../reducers";

const mapStateToProps = state => {
  const missionForSelectedTile = getActiveMissions(state).find(
    mission => state.selectedTile == mission.tile
  );

  const foodGrowthValue = getFoodGrowth(state);
  const foodGrowthString = `${
    foodGrowthValue >= 0 ? "+" : ""
  }${foodGrowthValue}`;

  return {
    turn: state.turn,
    selectedTile: state.selectedTile,
    missionForSelectedTile: missionForSelectedTile,
    currentPopulation: state.people.length,
    maxPopulation: getMaxPopulation(state),
    food: state.foodAmount,
    foodGrowth: foodGrowthString,
    showConquerButton: !state.selectedTile.taken && !missionForSelectedTile,
    displayConquerForm: state.displayConquerForm,
    activeMissions: getActiveMissions(state),
    state: state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    endTurnActionOnly: activeMissions => dispatch(endTurn(activeMissions)),
    processEndOfTurn: state => dispatch(processEndOfTurn(state)),
    toggleFormAction: () => dispatch(toggleForm())
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const updatedDispatchProps = {
    ...dispatchProps,
    endTurnAction: activeMissions =>
      dispatchProps.endTurnActionOnly(activeMissions) &&
      dispatchProps.processEndOfTurn(stateProps.state)
  };

  return {
    ...stateProps,
    ...updatedDispatchProps,
    ...ownProps
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
