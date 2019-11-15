import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import HeaderAd from '../../components/HeaderAd/';
import ItemSingle from '../../components/ItemSingle/';
import { askPermissions } from '../../store/actions/locations';
import I18n from 'react-native-i18n';
import Icon from '../../components/Icon/Icon';
import { colors } from '../../styles/Icons';
import CommonStyles from '../../styles/CommonStyles';
import Styles from './Styles';

class LocationSingle extends PureComponent {
  render() {
    const { id, data, onNavigate } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <TouchableOpacity
          onPress={async () => {
            const resp = await askPermissions();
            if (resp) {
              onNavigate('/map/'+data.id);
            }
          }}
          key={id}
          style={CommonStyles.onMapBtn}
        >
          <Icon 
            name={'icon-marker'}
            size={27}
            color={colors.darkGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const resp = await askPermissions();
            if (resp) {
              onNavigate('/map/'+data.id);
            }
          }}
          key={id}
          style={CommonStyles.onMapBtnTxt}
        >
          <Text style={Styles.text}>{I18n.t('map').toUpperCase()}</Text>
        </TouchableOpacity>
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

export default LocationSingle;
