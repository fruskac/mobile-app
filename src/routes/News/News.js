// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemList from "../../components/ItemList/";

import CommonStyles from "../../styles/CommonStyles";
import type NewsData from "../../types";

type Props = {
  items: Array<NewsData>,
  onFetchGoodToKnow: (language: string) => void,
  pageNumber: number,
  refreshing: boolean,
  setPageNumber: (pageNumber: number) => void,
  setRefreshing: (refreshing: boolean) => void,
  language: string,
};
type State = {};

class News extends PureComponent<Props, State> {
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
        <ItemList 
          items={items}
          slug="/news/"
          onRefresh={() => { this.props.setRefreshing(true); this.props.onFetchGoodToKnow(language, 0); this.props.setPageNumber(0); }}
          onEndReached={() => { this.props.onFetchGoodToKnow(language, pageNumber + 1); this.props.setPageNumber(pageNumber + 1); }}
          onEndReachedThreshold={0.3}
          refreshing={refreshing}
        />
      </View>
    );
  }
}

export default News;
