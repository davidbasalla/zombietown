import React from "react";

import Checkbox from "../Checkbox";

import connect from "./connect";

const PeopleCheckboxContainer = ({ people, updatePersonOnConquerForm }) => {
  const renderPersonOption = person => (
    <Checkbox
      label={person.firstName}
      handleCheckboxChange={updatePersonOnConquerForm(person)}
      key={person.firstName}
    />
  );

  return <div>{people.map(person => renderPersonOption(person))}</div>;
};

export default connect(PeopleCheckboxContainer);
