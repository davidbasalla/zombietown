import { connect } from "react-redux";
import { updatePersonOnConquerForm } from "../../actions";

const mapStateToProps = state => ({
  people: state.people
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updatePersonOnConquerForm: person => () => {
    console.log("holla ", person.firstName);
    return dispatch(updatePersonOnConquerForm(person));
  }
});

export default connect(mapStateToProps, mapDispatchToProps);
