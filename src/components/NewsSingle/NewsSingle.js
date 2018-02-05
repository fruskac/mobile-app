// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

import HeaderAd from "../HeaderAd/";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";
import type { NewsData } from "../News/News";

type Props = {
  language: string,
  data: NewsData
};
type State = {};

class NewsItem extends PureComponent<Props, State> {
  renderNewsItem() {
    const { data, language } = this.props;
    return (
      <ScrollView>
        <AutoHeightImage
          width={Screen.width}
          source={require("../../assets/ad-img.png")}
        />
        {/* <Text>{data["content_" + language]}</Text> */}
        <Text>Title test</Text>
        <Text>Content</Text>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        {this.renderNewsItem()}
      </View>
    );
  }
}

export default NewsItem;
