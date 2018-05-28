import { connect } from "react-redux";
import { conquer, toggleForm } from "../../actions";

const getSelectedPeople = state => {
  const selectedPeopleIds = state.ui.conquerFormState.selectedPeople;
  const selectedPeople = selectedPeopleIds.map(id =>
    state.people.find(person => id === person.id)
  );

  return selectedPeople;
};

const mapStateToProps = state => ({
  display: state.displayConquerForm,
  selectedTile: state.selectedTile,
  selectedPeople: getSelectedPeople(state)
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    conquerAction: (tile, people) =>
      dispatch(conquer(tile, people)) && dispatch(toggleForm()),
    toggleFormAction: () => dispatch(toggleForm())
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
