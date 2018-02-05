// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import I18n from "react-native-i18n";
import { Text, View, TouchableOpacity } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

import * as Screen from "../../utils/Screen";
import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";

const menuItems = ["news", "map", "locations", "trails", "info", "donate"];

type Props = {
  onNavigate: (route: string) => void,
  onChangeLanguage: (language: string) => void,
  language: string
};
type State = {};

class Menu extends PureComponent<Props, State> {
  render() {
    const { language, onChangeLanguage, onNavigate } = this.props;

    return (
      <View style={CommonStyles.container}>
        <AutoHeightImage
          width={Screen.width}
          source={require("../../assets/ad-img.png")}
        />
        <View style={[CommonStyles.viewMargin, Styles.menuHolder]}>
          <View>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onNavigate("/news");
                }}
              >
                <Text style={Styles.menuItem}>{I18n.t(item)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={Styles.menuItem}
            onPress={() => {
              onChangeLanguage(language === "en" ? "sr" : "en");
            }}
          >
            {language === "en" ? "Srpski" : "English"}
          </Text>
        </View>
      </View>
    );
  }
}

export default Menu;
