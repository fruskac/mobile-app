// @flow

import { connect } from "react-redux";
import NewsSingle from "./NewsSingle";

const mapDispatchToProps = {};
const mapStateToProps = (state, ownProps) => {
  return {
    language: state.settings.language,
    data: state.news.data
      .slice(0)
      .filter(n => n.id === ownProps.navigation.state.params.id)[0]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsSingle);
