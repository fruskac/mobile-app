import { connect } from 'react-redux';
import NewsSingle from './NewsSingle';
import { getLanguage } from '../../selectors/settings';

const mapDispatchToProps = {};
const mapStateToProps = (state, ownProps) => {
  return {
    language: state.settings.language,
    data: state.goodToKnow['articles_' + getLanguage(state)].filter(x => x.id == ownProps.navigation.state.params.id)[0],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsSingle);
