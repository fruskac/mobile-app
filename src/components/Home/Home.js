// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";
import I18n from "react-native-i18n";

type Props = {
  onChangeLanguage: (lang: string) => void,
  language: string
};
type State = {};

class Home extends PureComponent<Props, State> {
  render() {
    const { language } = this.props;
    return (
      <View>
        <Text>
          {this.props.language} {I18n.locale}
        </Text>
        <Text>{I18n.t("home")}</Text>
        <Button
          onPress={e => {
            this.props.onChangeLanguage("sr");
          }}
          title="Srpski"
        />
        <Button
          onPress={e => {
            this.props.onChangeLanguage("en");
          }}
          title="English"
        />
      </View>
    );
  }
}

export default Home;
