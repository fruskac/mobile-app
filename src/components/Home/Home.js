// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Alert, Image, View, Text, Button } from "react-native";
import I18n from "react-native-i18n";
import AutoHeightImage from "react-native-auto-height-image";
import NewsScreen from "../News";

import * as Screen from "../../utils/Screen";
import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";
import { NavigationActions } from "react-navigation";

type Props = {
  onChangeLanguage: (lang: string) => void,
  language: string,
  onNavigate: (route: string) => void,
  onNavigateBack: () => void
};
type State = {};

const menuItems = ["news", "map", "locations", "trails", "info", "donate"];

class Home extends PureComponent<Props, State> {
  render() {
    const {
      language,
      onChangeLanguage,
      onNavigate,
      onNavigateBack
    } = this.props;

    return (
      <View style={Styles.container}>
        {/* TODO replace with image supplied by API */}
        <AutoHeightImage
          width={Screen.width}
          source={require("../../assets/ad-img.png")}
        />
        <View style={[CommonStyles.viewMargin, Styles.menuHolder]}>
          <View>
            {menuItems.map((item, index) => (
              <Text
                style={Styles.menuItem}
                key={index}
                onPress={() => {
                  onNavigate("News");
                }}
              >
                {I18n.t(item)}
              </Text>
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

export default Home;
