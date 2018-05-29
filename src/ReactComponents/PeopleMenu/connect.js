import { connect } from "react-redux";

import { getPeopleOnMissions } from "../../reducers";

const mapStateToProps = state => ({
  people: state.people,
  peopleOnMissions: getPeopleOnMissions(state)
});

export default connect(mapStateToProps);
