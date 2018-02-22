// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

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
    const { data, language, navigation } = this.props;
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
