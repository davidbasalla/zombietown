import React from "react";
import connect from "./connect";
import styles from "./style.css";
import PeopleCheckboxContainer from "../PeopleCheckboxContainer";

const EventScreen = ({ content, display, toggleEventScreen }) => {
  return (
    <div style={display ? {} : { display: "none" }} className="eventScreen">
      <p>{content}</p>

      <div className="buttonContainer">
        <button className="button" onClick={() => toggleEventScreen()}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default connect(EventScreen);
