// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import I18n from "react-native-i18n";

import HeaderAd from "../../components/HeaderAd/";
import ItemSingle from "../../components/ItemSingle/";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";

class LocationSingle extends PureComponent {
  render() {
    const { data, language } = this.props;
    const item = Array.isArray(data) ? data[0] : data;

    if (!item) {
      return (
        <View style={CommonStyles.container}>
          <HeaderAd />
          <Text style={CommonStyles.text}>{I18n.t("location")}</Text>
        </View>
      );
    }

    const title = item.title || item[`title_${language}`] || "";
    const text = item.description || item[`description_${language}`] || "";
    const image = item.image || item.imageUrl || null;

    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemSingle image={image} title={title} text={text} />
      </View>
    );
  }
}

export default LocationSingle;
