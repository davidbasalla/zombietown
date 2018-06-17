import { connect } from "react-redux";

import { getDiscoveredPeople, getPeopleOnMissions } from "../../reducers";

const mapStateToProps = state => ({
  people: getDiscoveredPeople(state),
  peopleOnMissions: getPeopleOnMissions(state)
});

export default connect(mapStateToProps);
