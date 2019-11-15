import React, { PureComponent } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { width as ScreenWidth } from '../../utils/Screen';

class HeaderAd extends PureComponent {
  render() {
    const { onNavigate, small_ad } = this.props;

    return (
      <TouchableOpacity onPress={()=>{
        if (small_ad['internal']) {
          onNavigate(small_ad['link_url_en']);
        } else {
          Linking.openURL(small_ad['link_url_en']);
        }
        }}>
        <AutoHeightImage
          width={ScreenWidth}
          source={{uri: small_ad['img_url_en']}}
        />
      </TouchableOpacity>
    );
  }
}

export default HeaderAd;
