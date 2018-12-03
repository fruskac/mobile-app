// @flow

import { connect } from "react-redux";
import Locations from "./Locations";
import { getLanguage } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";
import { onLocationTypeChange, onFetchLocations } from "../../actions/locations";


const mapDispatchToProps = { onNavigate, onLocationTypeChange, onFetchLocations };
const mapStateToProps = state => ({
  filter: state.locations.filter,
  language: getLanguage(state),
  places: state.locations["places_"+state.settings.language],
  tags:
    state.settings.language == "sr"
      ? state.locations.tagsSr
      : state.locations.tagsEn
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
