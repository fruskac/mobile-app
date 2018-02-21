// @flow

import { connect } from "react-redux";

import {
  locationDataSr,
  locationDataEn
} from "../../reducers/locationsReducer";
import LocationSingle from "./LocationSingle";

const mapDispatchToProps = {};
const mapStateToProps = (state, ownProps) => {
  const currFilter = state.locations.filter;

  console.log("language ", state.settings.language);

  // get current list items based on language
  const items =
    state.settings.language == "en" ? locationDataEn : locationDataSr;

  // console.log("items", items, ownProps.navigation.state.params);

  // get items for current selected location type or place
  const filteredItems = items
    .slice(0)
    .filter(item => item.data.id === ownProps.navigation.state.params.id)
    .map(i => i.data);

  // console.log();

  return {
    language: state.settings.language,
    data: filteredItems.filter(
      n => n.id === ownProps.navigation.state.params.id
    )[0]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSingle);
