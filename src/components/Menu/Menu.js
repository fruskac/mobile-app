// @flow

import React, { PureComponent } from "react";
import I18n from "react-native-i18n";
import { Text, View, TouchableOpacity } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import * as Screen from "../../utils/Screen";
import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";
import { askPermissions } from "../../actions/locations";

const menuItems = ["news", "map", "locations", "trails", "info", "donate"];

type Props = {
  onNavigate: (route: string, reset: boolean) => void,
  onChangeLanguage: (language: string) => void,
  askPermissions: () => void,
  language: string,
  inDrawer: boolean,
  locations: Array,
  maps: Array,
  places: Array,
  onFetchLocations: (language: string) => void,
  onFetchMap: (language: string) => void,
};

type State = {};

class Menu extends PureComponent<Props, State> {
  static defaultProps = {
    inDrawer: false
  };

  render() {
    const { inDrawer, language, onChangeLanguage, onNavigate } = this.props;
    const width = inDrawer ? Screen.width * 0.7 : Screen.width;
    return (
      <View style={CommonStyles.container}>
        <TouchableOpacity onPress={ () => onNavigate("/info-single/623", inDrawer) } >
          <AutoHeightImage
            width={width}
            source={require("../../assets/ad-img.png")}
          />
        </TouchableOpacity>
        <View style={[CommonStyles.viewMargin, Styles.menuHolder]}>
          <View>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={async () => {
                  if(item.toLowerCase() === 'map') {
                    const resp = await askPermissions();
                    if (resp) {
                      onNavigate("/" + item.toLowerCase(), inDrawer);
                    }
                  } else if(item.toLowerCase() === 'donate') { 
                    onNavigate("/info-single/623", inDrawer);
                  }
                  else {
                    onNavigate("/" + item.toLowerCase(), inDrawer);
                  }
                }}
              >
                <Text style={Styles.menuItem}>{I18n.t(item)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {!inDrawer && (
            <Text
              style={Styles.menuItem}
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
