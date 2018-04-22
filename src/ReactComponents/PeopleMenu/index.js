import React from "react";
import connect from "./connect";
import styles from "./style.css";

const PeopleMenu = ({ people }) => {
  return (
    <div>
      <ul className="peopleList">
        {people.map(person => (
          <li key={person.firstName}>
            {person.firstName} {person.lastName}
          </li>
        ))}{" "}
      </ul>
    </div>
  );
};

export default connect(PeopleMenu);
