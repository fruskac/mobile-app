// @flow
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AutoHeightImage from "react-native-auto-height-image";
import { Animated, Easing, View, Text, Image } from "react-native";

import Styles from "./Styles";
import { width as ScreenWidth } from "../../utils/Screen";
import CommonStyles from "../../styles/CommonStyles";
import { SCREEN_CACHING_ERROR } from "../../actions/actionTypes";

type Props = {
  progress: number,
  done: boolean,
  screen: string
};
type State = {
  opacity: Animated.Value,
  hidden: boolean
};

class CacheScreen extends PureComponent<Props, State> {
  onFadeOutStart: Function;
  onFadeOutFinish: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(1),
      hidden: false
    };

    this.onFadeOutStart = this.onFadeOutStart.bind(this);
    this.onFadeOutFinish = this.onFadeOutFinish.bind(this);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.done != nextProps.done && nextProps.done) {
      this.onFadeOutStart();
    }
  }

  onFadeOutStart() {
    Animated.timing(
      this.state.opacity, // The animated value to drive
      {
        toValue: 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        duration: 300
      }
    ).start(this.onFadeOutFinish);
  }

  onFadeOutFinish() {
    // disable the cache screen
    this.setState({ hidden: true });
  }

  render() {
    const { progress, screen } = this.props;
    const { hidden } = this.state;

    if (hidden) return null;

    return (
      <Animated.View style={[Styles.holder, { opacity: this.state.opacity }]}>
        <Text style={[CommonStyles.text, Styles.topText]}>Map...a</Text>
        <View style={Styles.loader}>
          <AutoHeightImage
            width={ScreenWidth * 0.32}
            source={require("../../assets/volem-logo.png")}
          />

          {screen == SCREEN_CACHING_ERROR ? (
            <Text
              style={[
                CommonStyles.text,
                Styles.progressText,
                CommonStyles.errorText
              ]}
            >
              ERROR CACHING MAP AND DATA
            </Text>
          ) : (
            <Text style={[CommonStyles.text, Styles.progressText]}>
              {progress}%
            </Text>
          )}
        </View>
        <Text style={[CommonStyles.text, Styles.bottomText]}>Sponsor Logo</Text>
      </Animated.View>
    );
  }
}

export default CacheScreen;
