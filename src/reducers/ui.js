// Interesting thing happening here is that the state is not fully sliced, it's sort of a sub grouping

const ui = (state = {}, action) => {
  const currentFormState = state.conquerFormState;
  switch (action.type) {
    case "UPDATE_PERSON_ON_CONQUER_FORM":
      const person = action.person;
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
    case "SET_ERROR_ON_CONQUER_FORM":
      return {
        ...state,
        conquerFormState: {
          ...currentFormState,
          error: action.message
        }
      };
    case "CLEAR_SELECTED_PEOPLE":
      return {
        ...state,
        conquerFormState: {
          ...currentFormState,
          selectedPeople: []
        }
      };
    default:
      return state;
  }
};
export default ui;
