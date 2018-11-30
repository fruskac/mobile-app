// @flow

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import News from "./News";
import { getLanguage } from "../../selectors/settings";
import { getNews } from "../../selectors/news";
import { onFetchGoodToKnow } from "../../actions/goodToKnow";

const mapDispatchToProps = dispatch => bindActionCreators({ onFetchGoodToKnow }, dispatch);
const mapStateToProps = state => ({
  items: state.goodToKnow.articles,
  language: getLanguage(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
