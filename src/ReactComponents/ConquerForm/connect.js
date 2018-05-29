import { connect } from "react-redux";
import {
  clearSelectedPeople,
  conquer,
  setConquerFormError,
  toggleForm
} from "../../actions";

const getSelectedPeople = state => {
  const selectedPeopleIds = state.ui.conquerFormState.selectedPeople;
  const selectedPeople = selectedPeopleIds.map(id =>
    state.people.find(person => id === person.id)
  );

  return selectedPeople;
};

const mapStateToProps = state => ({
  display: state.displayConquerForm,
  error: state.ui.conquerFormState.error,
  selectedTile: state.selectedTile,
  selectedPeople: getSelectedPeople(state)
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    conquerAction: (tile, people) => {
      if (people.length < 1) {
        return dispatch(setConquerFormError("No people selected"));
      } else {
        return (
          dispatch(setConquerFormError(undefined)) &&
          dispatch(clearSelectedPeople()) &&
          dispatch(conquer(tile, people)) &&
          dispatch(toggleForm())
        );
      }
    },
    toggleFormAction: () => dispatch(toggleForm())
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
