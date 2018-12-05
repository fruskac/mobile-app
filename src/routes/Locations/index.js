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
  places: state.locations["places_rs"],
  tags:
    state.settings.language == "en"
      ? state.locations.tagsEn
      : state.locations.tagsSr
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
