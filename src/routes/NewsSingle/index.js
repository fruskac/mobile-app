// @flow

import { connect } from "react-redux";
import NewsSingle from "./NewsSingle";

const mapDispatchToProps = {};
const mapStateToProps = (state, ownProps) => {
  return {
    language: state.settings.language,
    data: state.goodToKnow.articles[0].id,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsSingle);
