import React from "react";
import connect from "./connect";
import styles from "./style.css";
import Checkbox from "../Checkbox";

const ConquerForm = ({
  display,
  selectedTile,
  conquerAction,
  people,
  toggleFormAction
}) => {
  const updatePeopleToGoOnMission = () => console.log("holla");

  const renderPersonOption = person => (
    <Checkbox
      label={person.firstName}
      handleCheckboxChange={updatePeopleToGoOnMission}
      key={person.firstName}
    />
  );

  return (
    <div style={display ? {} : { display: "none" }} className="conquerForm">
      <h2>Conquer tile</h2>

      <p>How many survivors will you send?</p>

      <div>{people.map(person => renderPersonOption(person))}</div>

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
