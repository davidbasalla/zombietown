import React from "react";
import connect from "./connect";
import styles from "./style.css";
import PeopleCheckboxContainer from "../PeopleCheckboxContainer";

const ConquerForm = ({
  conquerCounter,
  display,
  error,
  selectedPeople,
  selectedTile,
  conquerAction,
  successProbability,
  toggleFormAction
}) => {
  return (
    <div style={display ? {} : { display: "none" }} className="conquerForm">
      <h3>Conquer tile</h3>

      <h4>{`This building will take ${conquerCounter} days to conquer`}</h4>

      <p>Who will you send?</p>

      <PeopleCheckboxContainer />

      <p>{`Chance of success: ${successProbability}%`}</p>

      {error && <div className="error">Error: {error}</div>}

      <div className="buttonContainer">
        <button
          className="button"
          onClick={() =>
            conquerAction(selectedTile, selectedPeople, conquerCounter)
          }
        >
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
