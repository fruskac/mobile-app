import React, { PureComponent } from 'react';
import { View } from 'react-native';
import HeaderAd from '../../components/HeaderAd/';
import ItemList from '../../components/ItemList/';

import CommonStyles from '../../styles/CommonStyles';

class Tracks extends PureComponent {
  render() {
    const { tracks } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemList 
          items={tracks}
          slug='/track-single/'
        />
      </View>
    );
  }
}

export default Tracks;
