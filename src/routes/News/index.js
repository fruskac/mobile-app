// @flow

import { connect } from "react-redux";
import News from "./News";
import { getLanguage } from "../../selectors/settings";
import { getNews } from "../../selectors/news";

const mapDispatchToProps = {};
const mapStateToProps = state => ({
  items: getNews(state),
  language: getLanguage(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
