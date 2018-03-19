import React from "react";
import { connect } from "react-redux";
import { addTurn, conquer } from "../../actions";

import resourceTypes from "../../constants/resourceTypes";

import styles from "./style.css";

const mapStateToProps = state => ({
  turn: state.turn,
  selectedTile: state.selectedTile,
  currentPopulation: state.population,
  maxPopulation: state.maxPopulation,
  food: state.foodAmount,
  foodGrowth: `${state.foodGrowth >= 0 ? "+" : "-"}${state.foodGrowth}`
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTurnAction: () => dispatch(addTurn()),
    conquerAction: tile => dispatch(conquer(tile))
  };
};

const renderTileInfo = tile => {
  const attrs = tile.resourceAttributes;

  return Object.keys(attrs).map(function(key) {
    let obj = attrs[key];
    return <div key={key}>{`${resourceTypes[key]}: ${obj}`}</div>;
  });
};

const Menu = ({
  turn,
  selectedTile,
  currentPopulation,
  maxPopulation,
  food,
  foodGrowth,
  conquerAction,
  addTurnAction
}) => {
  const taken = selectedTile.taken;

  return (
    <div className="menu">
      <h3> Resources </h3>
      <span className="resource">
        👱: {`${currentPopulation}/${maxPopulation}`}
      </span>
      <span className="resource">🍎: {`${food} (${foodGrowth})`}</span>

      <h3>Selected tile:</h3>
      <h4>{selectedTile.displayName}</h4>
      <div>{renderTileInfo(selectedTile)}</div>

      {!taken && (
        <div className="buttonContainer">
          <button
            className="endTurnButton"
            onClick={() => conquerAction(selectedTile)}
          >
            Conquer tile
          </button>
        </div>
      )}

      <div className="buttonContainer">
        <button className="endTurnButton" onClick={addTurn}>
          End day {turn}
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null)(Menu);
