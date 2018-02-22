// @flow

import { connect } from "react-redux";
import NewsSingle from "./NewsSingle";
import { getNewsSingle } from "../../selectors/news";

const mapDispatchToProps = {};
const mapStateToProps = (state, ownProps) => {
  return {
    language: state.settings.language,
    data: getNewsSingle(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsSingle);
