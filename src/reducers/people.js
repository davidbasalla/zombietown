const people = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PERSON":
      const newPerson = action.person;

      const people = state.map(person => {
        if (person.id === newPerson.id) person.discovered = true;
        return person;
      });

      return people;
    default:
      return state;
  }
};
export default people;
