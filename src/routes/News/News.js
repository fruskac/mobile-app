// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemList from "../../components/ItemList/";

import CommonStyles from "../../styles/CommonStyles";
import type NewsData from "../../types";

type Props = {
  items: Array<NewsData>
};
type State = {};

class News extends PureComponent<Props, State> {
  render() {
    const { items } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemList items={items} slug="/news/" />
      </View>
    );
  }
}

export default News;
