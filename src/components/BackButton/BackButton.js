// @flow
import React, { PureComponent } from "react";
import { TouchableOpacity, Image } from "react-native";

import Styles from "./Styles";

type Props = {
  onNavigateBack: () => void
};
type State = {};

class BackButton extends PureComponent<Props, State> {
  render() {
    const { onNavigateBack } = this.props;
    return (
      <TouchableOpacity style={Styles.buttonHolder} onPress={onNavigateBack}>
        <Image source={require('../../assets/menu-icons-png/icons8-back-to-32.png')} />
      </TouchableOpacity>
    );
  }
}

export default BackButton;
