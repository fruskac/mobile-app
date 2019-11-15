import React, { PureComponent } from 'react';
import MapBox from '@react-native-mapbox-gl/maps';
import { TouchableOpacity, Text } from 'react-native';
import CommonStyles from '../../styles/CommonStyles';
import I18n from 'react-native-i18n';
import Image from '../../components/Image';

class MapCallout extends PureComponent {
  render() {
    const { onPress, place, title, image } = this.props;
    return (
      <MapBox.Callout style={CommonStyles.annotationPopupContainer}>
        <Image
          styles={CommonStyles.annotationPopupImage}
          imgUrl={image}
        />
        <Text style={CommonStyles.annotationPopupText}>{title + ', ' + place}</Text>
        <TouchableOpacity
          onPress={onPress}
          style={CommonStyles.annotationPopupButton}
        >
          <Text style={CommonStyles.annotationPopupButtonText}>{I18n.t('show-more-details')}</Text>
        </TouchableOpacity>
      </MapBox.Callout>
    );
  }
}

export default MapCallout;
