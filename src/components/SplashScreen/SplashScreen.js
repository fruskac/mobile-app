import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

import { Styles } from './Styles';

export default class SplashScreen extends PureComponent {
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    this.props.onFetchConfig('rs');
  }

  render() {
    const { sponsor_logo } = this.props;

    return (
      <View style={Styles.holder}>
        <Image
          style={Styles.img}
          source={require('../../assets/splash-screen/Splash.jpg')}
        />
        { sponsor_logo ? 
        <Image
          style={[Styles.bottomText, Styles.sponsorLogo]}
          source={{uri: sponsor_logo['img_url']}}
        />
        : null
        }
      </View>
    );
  }
}
