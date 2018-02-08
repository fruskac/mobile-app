// @flow

import { connect } from "react-redux";
import Locations from "./Locations";

const mapDispatchToProps = {};
const mapStateToProps = state => ({
  tags:
    state.settings.language == "sr"
      ? state.locations.tagsSr
      : state.locations.tagsEn,
  language: state.settings.language
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
