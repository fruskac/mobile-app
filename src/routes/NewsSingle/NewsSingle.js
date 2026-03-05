// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import I18n from "react-native-i18n";

import HeaderAd from "../../components/HeaderAd/";
import ItemSingle from "../../components/ItemSingle/";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";
import type NewsData from "../../types";

type Props = {
  language: string,
  id: string,
  data: NewsData,
  navigation: any
};
type State = {};

class NewsItem extends PureComponent<Props, State> {
  render() {
    const { data, language } = this.props;

    if (!data) {
      return (
        <View style={CommonStyles.container}>
          <HeaderAd />
          <Text style={CommonStyles.text}>{I18n.t("news")}</Text>
        </View>
      );
    }

    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemSingle
          image={
            "https://fruskac.net/sites/default/files/styles/thumbnail/public/thumb/locations/fruskac-lubenice-9.jpg?itok=VmGpdDjb"
          }
          title={data[`title_${language}`]}
          text={data[`content_${language}`]}
        />
      </View>
    );
  }
}

export default NewsItem;
