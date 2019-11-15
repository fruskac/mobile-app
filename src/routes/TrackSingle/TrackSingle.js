import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { askPermissions } from '../../store/actions/locations';
import { colors } from '../../styles/Icons';
import HeaderAd from '../../components/HeaderAd/';
import ItemSingle from '../../components/ItemSingle/';
import CommonStyles from '../../styles/CommonStyles';
import Styles from './Styles';

class TrackSingle extends PureComponent {
  render() {
    const { id, data, onNavigate } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <TouchableOpacity
          onPress={async () => {
            const resp = await askPermissions();
            if (resp) {
              onNavigate('/track-map/'+data.id);
            }
          }}
          key={id}
          style={CommonStyles.onMapBtn}
        >
           <Icon 
            name={'icon-start'}
            size={30}
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
          <Text style={Styles.startText}>START</Text>
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

export default TrackSingle;
