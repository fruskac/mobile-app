import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import I18n from 'react-native-i18n';

import HeaderAd from '../../components/HeaderAd/';
import ItemList from '../../components/ItemList/';

import CommonStyles from '../../styles/CommonStyles';

class News extends PureComponent {
  componentDidMount = () => {
    this.props.onFetchGoodToKnow(this.props.language === 'en' ? 'en' : 'rs', 0);
    this.props.setPageNumber(0);
  }

  render() {
    const { items, pageNumber, refreshing } = this.props;
    const language = this.props.language === 'en' ? 'en' : 'rs';
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        { items ?
          <ItemList 
          items={items}
          slug='/news/'
          onRefresh={() => { this.props.setRefreshing(true); this.props.onFetchGoodToKnow(language, 0); this.props.setPageNumber(0); }}
          onEndReached={() => { this.props.onFetchGoodToKnow(language, pageNumber + 1); this.props.setPageNumber(pageNumber + 1); }}
          onEndReachedThreshold={0.3}
          refreshing={refreshing}
        />
        : <Text>{I18n.t('loading')}</Text>
        }
      </View>
    );
  }
}

export default News;
