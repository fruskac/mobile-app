// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Image, View, Text, TouchableOpacity } from "react-native";
import I18n from "react-native-i18n";
import HeaderAd from "../../components/HeaderAd/";

import CommonStyles, {
    navHeaderHeight,
    headerAdHeight,
    accentColor
  } from "../../styles/CommonStyles";
  import Styles, { menuHeight } from "./Styles";
  import * as Icons from "../../styles/Icons";
  import { height as screenHeight } from "../../utils/Screen";
import { onNavigate } from "../../actions/navigation";

type Props = {
    onNavigate: (route: string) => void
};
type State = {};

class Trails extends PureComponent<Props, State> {
  constructor(props){
    super(props);
    this.state = {
        filter: "walks"
    };
  }
  render() {
    const { onNavigate } = this.props;
    let walkStyle = {},
    mtbStyle = {};

    const underlineStyle = {
      borderBottomColor: accentColor,
      borderBottomWidth: 2
    };

    this.state.filter == "walks"
      ? (walkStyle = underlineStyle)
      : (mtbStyle = underlineStyle);

    return (
        <View>
            <HeaderAd />
            <View style={Styles.topMenu}>
                <TouchableOpacity
                    key="walks"
                    style={[Styles.topMenuItem, walkStyle]}
                    onPress={() => this.setState({filter: "walks"})}
                >
                    <Text style={CommonStyles.textTabs}> {I18n.t("walks")} </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    key="mtb"
                    style={[Styles.topMenuItem, mtbStyle]}
                    onPress={() => this.setState({filter: "MTB"})}
                >
                    <Text style={CommonStyles.textTabs}> MTB </Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.menu}>
                <TouchableOpacity style={Styles.menuItem} onPress={() => {onNavigate('/locations')} }>
                    <View style={Styles.circlesBox}>
                        <View style={[Styles.circle, Styles.colorEasy]} />
                    </View>
                    <Text style={Styles.menuItemText}> {I18n.t("easy")} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.menuItem}>
                    <View style={Styles.circlesBox}>
                        <View style={[Styles.circle, Styles.colorMedium]} />
                        <View style={[Styles.circle, Styles.colorMedium]} />
                    </View>
                    <Text style={Styles.menuItemText}> {I18n.t("medium")} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.menuItem}>
                    <View style={Styles.circlesBox}>
                        <View style={[Styles.circle, Styles.colorHard]} />
                        <View style={[Styles.circle, Styles.colorHard]} />
                        <View style={[Styles.circle, Styles.colorHard]} />
                    </View>
                    <Text style={Styles.menuItemText}> {I18n.t("hard")} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.menuItem}>
                    <Image source={require('../../assets/menu-icons-png/icons8-running-30.png')} />
                    <Text style={Styles.menuItemText}> {I18n.t("marathon")} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.menuItem}>
                    <Image source={require('../../assets/menu-icons-png/icons8-info-30.png')} />
                    <Text style={Styles.menuItemText}> {I18n.t("info")} </Text>
                </TouchableOpacity>
            </View>
        </View>);
  }
}

export default Trails;
