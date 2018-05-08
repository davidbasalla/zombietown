const ui = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PERSON_ON_CONQUER_FORM":
      const person = action.person;
      const currentFormState = state.conquerFormState;
      const selectedPeople = state.conquerFormState.selectedPeople;

      if (selectedPeople.includes(person.id)) {
        return {
          ...state,
          conquerFormState: {
            ...currentFormState,
            selectedPeople: selectedPeople.filter(id => id != person.id)
          }
        };
      } else {
        return {
          ...state,
          conquerFormState: {
            ...currentFormState,
            selectedPeople: [...selectedPeople, person.id]
          }
        };
      }
    default:
      return state;
  }
};
export default ui;
