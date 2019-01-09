// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";

import Menu from "../../components/Menu";
import CommonStyles from "../../styles/CommonStyles";

type Props = {};
type State = {};

class Home extends PureComponent<Props, State> {
  render() {
    return (
      <View style={CommonStyles.container}>
        <Menu />
      </View>
    );
  }
}

export default Home;
