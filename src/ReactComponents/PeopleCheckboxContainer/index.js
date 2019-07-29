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
      label={` ${person.icon} ${person.firstName} ${person.lastName}`}
      checked={isPersonSelected(person)}
      handleCheckboxChange={updatePersonOnConquerForm(person)}
      key={person.firstName}
    />
  );

  const peoplePresent = people.length > 0;

  return (
    <div>
      {peoplePresent && people.map(person => renderPersonOption(person))}
      {!peoplePresent && <span>No people available at the moment</span>}
    </div>
  );
};

export default connect(PeopleCheckboxContainer);
