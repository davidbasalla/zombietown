import React from "react";
import connect from "./connect";
import styles from "./style.css";

const ConquerForm = ({
  display,
  selectedTile,
  conquerAction,
  toggleFormAction
}) => {
  return (
    <div style={display ? {} : { display: "none" }} className="conquerForm">
      <h2>Conquer tile</h2>

      <p>How many survivors will you send?</p>
      <p>Chance of success: 0%</p>

      <div className="buttonContainer">
        <button className="button" onClick={() => conquerAction(selectedTile)}>
          Conquer
        </button>
      </div>

      <div className="buttonContainer">
        <button className="button" onClick={toggleFormAction}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default connect(ConquerForm);
