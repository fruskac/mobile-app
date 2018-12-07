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
          image={data.image}
          title={data.title}
          text={data.desciption}
          longText={data.desciption_long}
        />
      </View>
    );
  }
}

export default NewsItem;
// {data.desciption_long.replace(new RegExp('src="/sites/', 'g'), 'src="https://fruskac.net/sites/')}