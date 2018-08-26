import React from "react";
import connect from "./connect";
import styles from "./style.css";

const PeopleMenu = ({ peopleOnMissions, people }) => {
  const getStatus = person => {
    const peopleOnMissionIds = peopleOnMissions.map(p => p.id);
    const isPersonOnMission = peopleOnMissionIds.includes(person.id);
    return isPersonOnMission ? "(on mission)" : "";
  };

  return (
    <div>
      <ul className="peopleList">
        {people.map(person => (
          <li key={person.firstName}>
            {person.icon} {person.firstName} {person.lastName}{" "}
            {getStatus(person)}
          </li>
        ))}{" "}
      </ul>
    </div>
  );
};

export default connect(PeopleMenu);
