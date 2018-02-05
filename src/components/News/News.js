// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import newsDemoData from "../../assets/Demo/news";

import HeaderAd from "../HeaderAd/";
import ItemList from "../ItemList/";

import CommonStyles from "../../styles/CommonStyles";

export type NewsData = {
  title_en: string,
  title_sr: string,
  id: string,
  content: string,
  imageUrl: string
};
type Props = {
  data: Array<NewsData>
};
type State = {};

class News extends PureComponent<Props, State> {
  static defaultProps = {
    data: newsDemoData
  };
  render() {
    const { data } = this.props;

    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemList data={data} />
      </View>
    );
  }
}

export default News;
