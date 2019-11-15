import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import News from './News';
import { getLanguage } from '../../selectors/settings';
import { onFetchGoodToKnow, setPageNumber, setRefreshing } from '../../store/actions/goodToKnow';

const mapDispatchToProps = dispatch => bindActionCreators({ onFetchGoodToKnow, setPageNumber, setRefreshing }, dispatch);
const mapStateToProps = state => ({
  items: state.goodToKnow ? state.goodToKnow['articles_' + getLanguage(state)] : null,
  language: getLanguage(state),
  refreshing: state.goodToKnow.refreshing,
  pageNumber: state.goodToKnow.pageNumber,
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
