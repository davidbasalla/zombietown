import React from "react";

import Checkbox from "../Checkbox";

import connect from "./connect";

const PeopleCheckboxContainer = ({
  people,
  selectedPeople,
  updatePersonOnConquerForm
}) => {
  const isPersonSelected = person => selectedPeople.includes(person.id);

  const renderPersonOption = person => (
    <Checkbox
      label={person.firstName}
      checked={isPersonSelected(person)}
      handleCheckboxChange={updatePersonOnConquerForm(person)}
      key={person.firstName}
    />
  );

  return <div>{people.map(person => renderPersonOption(person))}</div>;
};

export default connect(PeopleCheckboxContainer);
