// @flow

import { connect } from "react-redux";
import LocationTypePlace from "./LocationTypePlace";
import {
  locationDataSr,
  locationDataEn
} from "../../reducers/locationsReducer";

const mapDispatchToProps = {};

const mapStateToProps = (state, ownProps) => {
  console.log("ownProps ", ownProps);
  const currFilter = state.locations.filter;

  // get current list items based on language
  const items =
    state.settings.language === "en" ? locationDataEn : locationDataSr;

  // get items for current selected location type or place
  const filteredItems = items
    .slice(0)
    .filter(item => item.tag === ownProps.navigation.state.params.id)
    .map(i => i.data);
  return {
    items: filteredItems
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationTypePlace);
