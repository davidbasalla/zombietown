import React from "react";
import { connect } from "react-redux";
import { addTurn } from "../../actions";

import styles from "./style.css";

const mapStateToProps = state => ({
  turn: state.turn,
  selectedTile: state.selectedTile,
  currentPopulation: 0,
  maxPopulation: 10,
  food: 0,
  foodGrowth: "+2"
});

const mapDispatchToProps = dispatch => ({
  addTurn: () => dispatch(addTurn())
});

const Menu = ({
  turn,
  selectedTile,
  currentPopulation,
  maxPopulation,
  food,
  foodGrowth,
  addTurn
}) => {
  return (
    <div className="menu">
      <h3> Resources </h3>
      <span className="resource">
        👱: {`${currentPopulation}/${maxPopulation}`}
      </span>
      <span className="resource">🍎: {`${food} (${foodGrowth})`}</span>

      <h3>Selected tile:</h3>
      <div>{selectedTile}</div>

      <div className="buttonContainer">
        <button className="endTurnButton" onClick={addTurn}>
          End day {turn}
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
