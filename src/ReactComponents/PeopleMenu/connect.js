import { connect } from "react-redux";

const mapStateToProps = state => ({
  people: state.people
});

export default connect(mapStateToProps);
