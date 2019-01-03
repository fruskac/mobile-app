// @flow

import { connect } from "react-redux";
import Locations from "./Locations";
import { getLanguage } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";
import { onLocationTypeChange, onFetchLocations, onFetchMap } from "../../actions/locations";


const mapDispatchToProps = { onNavigate, onLocationTypeChange, onFetchLocations, onFetchMap };
const mapStateToProps = state => ({
  filter: state.locations.filter,
  language: getLanguage(state),
  places: state.locations["places_rs"],
  map: state.locations["map_rs"],
  tags: state.locations['tags_' + getLanguage(state)],
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
