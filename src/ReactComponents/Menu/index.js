import React from "react";
import styles from "./style.css";

class Menu extends React.Component {
  render() {
    const { turn } = this.props;

    return (
      <div className="menu">
        <h2>Day {turn}</h2>
        <button className="endTurnButton">End turn</button>
      </div>
    );
  }
}

export default Menu;
