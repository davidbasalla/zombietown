import { connect } from "react-redux";
import { endTurn, conquer } from "../../actions";

const getFoodGrowth = state => {
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

const mapStateToProps = state => ({
  turn: state.turn,
  selectedTile: state.selectedTile,
  currentPopulation: state.population,
  maxPopulation: state.maxPopulation,
  food: state.foodAmount,
  foodGrowth: getFoodGrowth(state),
  showConquerButton:
    !state.selectedTile.taken && !state.selectedTile.conquerCounter
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    endTurnAction: () => dispatch(endTurn()),
    conquerAction: tile => dispatch(conquer(tile))
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
