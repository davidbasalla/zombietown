import React from "react";
import { connect } from "react-redux";
import { endTurn, conquer } from "../../actions";

import resourceTypes from "../../constants/resourceTypes";

import styles from "./style.css";

const mapStateToProps = state => ({
  turn: state.turn,
  selectedTile: state.selectedTile,
  currentPopulation: state.population,
  maxPopulation: state.maxPopulation,
  food: state.foodAmount,
  foodGrowth: `${state.foodGrowth >= 0 ? "+" : "-"}${state.foodGrowth}`,
  showConquerButton:
    !state.selectedTile.taken && !state.selectedTile.conquerCounter
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    endTurnAction: () => dispatch(endTurn()),
    conquerAction: tile => dispatch(conquer(tile))
  };
};

const renderResourceTypes = attrs =>
  Object.keys(attrs).map(function(key) {
    let obj = attrs[key];
    return <div key={key}>{`${resourceTypes[key]}: ${obj}`}</div>;
  });

const renderTileInfo = tile => {
  let divs = renderResourceTypes(tile.resourceAttributes);
  tile.conquerCounter &&
    divs.push(
      <div key="conquer">{`Conquering in ${tile.conquerCounter} days`}</div>
    );
  return divs;
};

const Menu = ({
  turn,
  selectedTile,
  currentPopulation,
  maxPopulation,
  food,
  foodGrowth,
  conquerAction,
  endTurnAction,
  showConquerButton
}) => {
  return (
    <div className="menu">
      {/* <h3> Resources </h3> */}
      <div className="resourceContainer">
        <span className="resource">
          👱: {`${currentPopulation}/${maxPopulation}`}
        </span>
        <span className="resource">🍎: {`${food} (${foodGrowth})`}</span>
      </div>

      <hr />

      {/* <h3>Selected tile:</h3> */}
      <h4>{selectedTile.displayName}</h4>
      <div>{renderTileInfo(selectedTile)}</div>

      {showConquerButton && (
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
        <button className="endTurnButton" onClick={endTurnAction}>
          End day {turn}
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null)(Menu);
