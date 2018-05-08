import { connect } from "react-redux";
import { conquer, toggleForm } from "../../actions";

const mapStateToProps = state => ({
  display: state.displayConquerForm,
  selectedTile: state.selectedTile,
  people: state.people
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    conquerAction: tile => dispatch(conquer(tile)) && dispatch(toggleForm()),
    toggleFormAction: () => dispatch(toggleForm())
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
