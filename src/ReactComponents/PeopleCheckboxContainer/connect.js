import { connect } from "react-redux";
import { setConquerFormError, updatePersonOnConquerForm } from "../../actions";
import { getAvailablePeople } from "../../reducers";

const mapStateToProps = state => ({
  people: getAvailablePeople(state),
  selectedPeople: state.ui.conquerFormState.selectedPeople
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updatePersonOnConquerForm: person => () => {
    return (
      dispatch(setConquerFormError(undefined)) &&
      dispatch(updatePersonOnConquerForm(person))
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps);
