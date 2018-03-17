import React from "react";
import styles from "./style.css";

const Menu = props => {
  const { turn, selectedTile } = props.state;

  return (
    <div className="menu">
      <h2>Day {turn}</h2>
      <div>
        <h3>{selectedTile}</h3>
      </div>

      <button className="endTurnButton" onClick={props.nextTurn}>
        End turn
      </button>
    </div>
  );
};

export default Menu;
