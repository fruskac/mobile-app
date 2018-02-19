// @flow

import { connect } from "react-redux";
import Locations from "./Locations";

const mapDispatchToProps = {};
const mapStateToProps = state => ({
  locationFilter: state.locations.locationFilter,
  tags:
    state.settings.language == "sr"
      ? state.locations.tagsSr
      : state.locations.tagsEn
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
