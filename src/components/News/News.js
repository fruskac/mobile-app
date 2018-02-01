// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

type Props = {
  onNavigateBack: () => void
};
type State = {};

class News extends PureComponent<Props, State> {
  render() {
    const { onNavigateBack } = this.props;
    return <Text onPress={onNavigateBack}>News</Text>;
  }
}

export default News;
