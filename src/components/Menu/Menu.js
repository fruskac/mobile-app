// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import I18n from "react-native-i18n";
import { Text, View, TouchableOpacity, Image } from "react-native";

import * as Screen from "../../utils/Screen";
import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";

const menuItems = ["news", "map", "locations", "trails", "info", "donate"];

type Props = {
  onNavigate: (route: string, reset: boolean) => void,
  onChangeLanguage: (language: string) => void,
  language: string,
  inDrawer: boolean
};
type State = {};

class Menu extends PureComponent<Props, State> {
  static defaultProps = {
    inDrawer: false
  };

  render() {
    const { inDrawer, language, onChangeLanguage, onNavigate } = this.props;
    const width = inDrawer ? Screen.widthDrawer : Screen.width;
    const heroHeight = Math.round((width * 360) / 700);
    return (
      <View style={CommonStyles.container}>
        <Image
          style={[Styles.heroImage, { width, height: heroHeight }]}
          source={require("../../assets/ad-img.png")}
          resizeMode="cover"
        />
        <View style={CommonStyles.viewMargin}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onNavigate("/" + item.toLowerCase(), inDrawer);
              }}
            >
              <Text style={Styles.menuItem}>{I18n.t(item)}</Text>
            </TouchableOpacity>
          ))}

          {!inDrawer && (
            <Text
              style={[Styles.menuItem, { marginTop: 24 }]}
              onPress={() => {
                onChangeLanguage(language === "en" ? "sr" : "en");
              }}
            >
              {language === "en" ? "Srpski" : "English"}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

export default Menu;
