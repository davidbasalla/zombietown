import { connect } from "react-redux";
import { removeEventMessage } from "../../actions";

const mapStateToProps = state => {
  const content = state.ui.eventMessages.slice(-1)[0];

  return {
    display: state.ui.eventMessages.length > 0,
    content: content
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleEventScreen: () => dispatch(removeEventMessage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
