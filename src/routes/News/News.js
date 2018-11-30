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
};
type State = {};

class News extends PureComponent<Props, State> {
  componentDidMount = () => {
    this.props.onFetchGoodToKnow('rs');
  }

  render() {
    const { items } = this.props;
    console.log(items);
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemList items={items} slug="/news/" />
      </View>
    );
  }
}

export default News;
