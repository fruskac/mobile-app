// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

import HeaderAd from "../../components/HeaderAd/";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";
import type { NewsData } from "../News/News";
import Styles from "./Styles";

type Props = {
  language: string,
  id: string,
  data: NewsData,
  navigation: any
};
type State = {};

class NewsItem extends PureComponent<Props, State> {
  renderNewsItem() {
    const { data, language, navigation } = this.props;
    console.log("newssingle", data);
    return (
      <ScrollView>
        <AutoHeightImage
          width={Screen.width}
          source={require("../../assets/ad-img.png")}
        />
        {/* <Text>{data["content_" + language]}</Text> */}
        <Text style={Styles.textTitle}>{data[`title_${language}`]}</Text>
        <Text style={Styles.text}>{data[`content_${language}`]}</Text>
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
