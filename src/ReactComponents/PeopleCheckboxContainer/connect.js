import { connect } from "react-redux";
import { setConquerFormError, updatePersonOnConquerForm } from "../../actions";

const mapStateToProps = state => ({
  people: state.people,
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
