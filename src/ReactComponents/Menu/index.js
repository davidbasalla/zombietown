import React from "react";
import { connect } from "react-redux";
import { addTurn } from "../../actions";

import styles from "./style.css";

const mapStateToProps = state => ({
  turn: state.turn
});

const mapDispatchToProps = dispatch => ({
  addTurn: () => dispatch(addTurn())
});

const Menu = ({ turn, addTurn }) => {
  return (
    <div className="menu">
      <h2>Day {turn}</h2>
      <div>
        <h3>SELECTED TILE - WIP</h3>
      </div>

      <button className="endTurnButton" onClick={addTurn}>
        End turn
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
