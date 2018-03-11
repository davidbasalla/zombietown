import React from "react";
import styles from "./style.css";

class Menu extends React.Component {
  render() {
    const { turn, selectedTile } = this.props.state;
    const { nextTurn } = this.props;

    return (
      <div className="menu">
        <h2>Day {turn}</h2>
        <div>
          <h3>{selectedTile}</h3>
        </div>

        <button className="endTurnButton" onClick={nextTurn}>
          End turn
        </button>
      </div>
    );
  }
}

export default Menu;
