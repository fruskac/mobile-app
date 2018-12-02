// @flow

import { connect } from "react-redux";
import NewsSingle from "./NewsSingle";

const mapDispatchToProps = {};
const mapStateToProps = (state, ownProps) => {
  return {
    language: state.settings.language,
    data: state.goodToKnow.articles.filter(x => x.id == ownProps.navigation.state.params.id)[0],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsSingle);
