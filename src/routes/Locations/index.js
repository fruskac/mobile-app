// @flow

import { connect } from "react-redux";
import Locations from "./Locations";
import { onNavigate } from "../../actions/navigation";
import { onLocationTypeChange } from "../../actions/locations";


const mapDispatchToProps = { onNavigate, onLocationTypeChange };
const mapStateToProps = state => ({
  filter: state.locations.filter,
  language: state.settings.language,
  tags:
    state.settings.language == "sr"
      ? state.locations.tagsSr
      : state.locations.tagsEn
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
