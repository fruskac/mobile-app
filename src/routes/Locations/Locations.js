// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import I18n from "react-native-i18n";
import SvgUri from "react-native-svg-uri";

import HeaderAd from "../../components/HeaderAd/";

import CommonStyles, {
  navHeaderHeight,
  headerAdHeight,
  accentColor
} from "../../styles/CommonStyles";
import Styles, { menuHeight } from "./Styles";
import * as Icons from "../../styles/Icons";
import { height as screenHeight } from "../../utils/Screen";

type Props = {
  tags: Array<string>,
  locationFilter: string
};
type State = {};

class Locations extends PureComponent<Props, State> {
  render() {
    const { tags, locationFilter } = this.props;
    // caluclate button height for button with icons
    const buttonHeight =
      (screenHeight -
        navHeaderHeight -
        headerAdHeight -
        menuHeight -
        2 * CommonStyles.viewMargin -
        10) /
      Math.floor((tags.length + 1) / 2);

    let typeStyle = {},
      placeStyle = {};

    const underlineStyle = {
      borderBottomColor: accentColor,
      borderBottomWidth: 2
    };

    console.log("location", locationFilter, locationFilter == "type");

    locationFilter == "type"
      ? (typeStyle = underlineStyle)
      : (placeStyle = underlineStyle);

    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <View style={Styles.topMenu}>
          <View
            key="type"
            style={[Styles.topMenuItem, Styles.withRightBorder, typeStyle]}
          >
            <Text style={CommonStyles.text}>{I18n.t("type")}</Text>
          </View>
          <View key="place" style={[Styles.topMenuItem, placeStyle]}>
            <Text style={CommonStyles.text}>{I18n.t("place")}</Text>
          </View>
        </View>

        <View style={Styles.menu}>
          {tags.map((t, index) => (
            <View
              key={index}
              style={[
                Styles.topMenuItem,
                { height: buttonHeight },
                index % 2 === 0 ? Styles.withRightBorder : {}
              ]}
            >
              <SvgUri
                width={50}
                height={45}
                source={Icons[t.replace("-", "")]}
                fill={Icons.colors[t.replace("-", "")]}
              />
              <Text style={CommonStyles.text}>{I18n.t(t)}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Locations;
