import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import I18n from 'react-native-i18n';
import HeaderAd from '../../components/HeaderAd/';

import CommonStyles, {accentColor} from '../../styles/CommonStyles';
import Styles from './Styles';

class Trails extends PureComponent {
  constructor (props) {
    super (props);
    this.state = {
      menu: [
        {
          id: 1,
          title: 'easy',
          type: 'hiking',
          color: '#808900',
        },
        {
          id: 2,
          title: 'easy',
          type: 'rides',
          color: '#808900',
        },
        {
          id: 3,
          title: 'medium',
          type: 'hiking',
          color: '#FCB900',
        },
        {
          id: 4,
          title: 'medium',
          type: 'rides',
          color: '#FCB900',
        },
        {
          id: 3,
          title: 'hard',
          type: 'hiking',
          color: '#B80000',
        },
        {
          id: 4,
          title: 'hard',
          type: 'rides',
          color: '#B80000',
        },
        {
          id: 5,
          title: 'marathon',
          type: 'hiking',
          color: '#000',
        },
      ],
    };
  }

  componentDidMount () {
    this.props.onFetchTracks (this.props.language === 'en' ? 'en' : 'rs');
  }

  render () {
    const {onNavigate, tracks} = this.props;

    return (
      <View>
        <HeaderAd />
        <View style={Styles.trailsContainer}>
          {this.state.menu.map (item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                tracks.filter (
                  track =>
                    track.track_category.toLowerCase () ===
                      item.title.toLowerCase () &&
                    track.track_type.toLowerCase () === item.type.toLowerCase ()
                ).length > 0
                  ? onNavigate ('/tracks/' + item.title + '/' + item.type)
                  : null;
              }}
              style={[
                Styles.menuItem,
                item.type !== 'rides' ? Styles.borderRightWidth : {},
              ]}
            >
              <Icon
                style={{top: 6}}
                name={item.type === 'rides' ? 'icon-bicycle' : 'icon-walk'}
                size={45}
                color={item.color}
                style={
                  tracks.filter (
                    track =>
                      track.track_category.toLowerCase () ===
                        item.title.toLowerCase () &&
                      track.track_type.toLowerCase () ===
                        item.type.toLowerCase ()
                  ).length > 0
                    ? {}
                    : {opacity: 0.3}
                }
              />
              <Text
                style={[
                  CommonStyles.text,
                  {marginTop: 6},
                  tracks.filter (
                    track =>
                      track.track_category.toLowerCase () ===
                        item.title.toLowerCase () &&
                      track.track_type.toLowerCase () ===
                        item.type.toLowerCase ()
                  ).length > 0
                    ? {}
                    : {opacity: 0.3},
                ]}
              >
                {I18n.t (item.title)}
              </Text>
            </TouchableOpacity>
          ))}

        </View>
      </View>
    );
  }
}

export default Trails;
