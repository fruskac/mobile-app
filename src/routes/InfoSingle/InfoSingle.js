import React, { PureComponent } from 'react';
import { View } from 'react-native';

import HeaderAd from '../../components/HeaderAd/';
import ItemSingle from '../../components/ItemSingle/';

import CommonStyles from '../../styles/CommonStyles';

class InfoSingle extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemSingle
          image={data.image}
          title={data.title}
          text={data.description}
          longText={data.description_long}
        />
      </View>
    );
  }
}

export default InfoSingle;
