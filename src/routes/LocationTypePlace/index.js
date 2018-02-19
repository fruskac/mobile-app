// @flow

import { connect } from "react-redux";
import LocationTypePlace from "./LocationTypePlace";

const mapDispatchToProps = {};
const mapStateToProps = state => ({
  data: state.LocationTypePlace.data,
  language: state.settings.language
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationTypePlace);
