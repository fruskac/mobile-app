import React, { PureComponent } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { Animated, Easing, Linking, View, Text, Image, TouchableOpacity } from 'react-native';

import Styles from './Styles';
import { width as ScreenWidth } from '../../utils/Screen';
import CommonStyles from '../../styles/CommonStyles';

class CacheScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(1),
      hidden: props.progress == 100,
    };
    this.onFadeOutStart = this.onFadeOutStart.bind(this);
    this.onFadeOutFinish = this.onFadeOutFinish.bind(this);
  }

  componentDidMount() {
    this.props.onFetchInfos('rs');
    this.props.onFetchMap('rs');
    this.props.onFetchLocations('rs');
    this.props.onFetchConfig('rs');
    this.props.onFetchTracks('rs');
    this.props.onFetchGoodToKnow('rs', 0);
    this.props.onFetchGoodToKnow('en', 0);
    this.props.cacheMap();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.progress == 100) {
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
    const { progress, error, onNavigate, sponsor_logo } = this.props;

    if (this.state.hidden) return null;
    return (
      <Animated.View style={[Styles.holder, { opacity: this.state.opacity }]}>
        <Text style={[CommonStyles.text, Styles.topText]}>Map...a</Text>
        <View style={Styles.loader}>
          <AutoHeightImage
            width={ScreenWidth * 0.32}
            source={require('../../assets/volem-logo.png')}
          />
          {error ? (
            <View style={Styles.loader}>
              <Text style={[CommonStyles.text, Styles.progressText]}>
                {progress.toFixed(0)}%
              </Text>
              <Text
                style={[
                  CommonStyles.text,
                  Styles.progressText,
                  CommonStyles.errorText
                ]}
              >
                {error}
              </Text>
              <TouchableOpacity style={Styles.reloadButton} onPress={() => {this.props.resetDownload();  this.props.cacheMap();}}>
                <Text style={[CommonStyles.text, Styles.reloadButtonText]}>reload map</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={[CommonStyles.text, Styles.progressText]}>
              {progress.toFixed(0)}%
            </Text>
          )}
        </View>
        { sponsor_logo ? 
          <TouchableOpacity onPress={()=>{
              if (sponsor_logo['internal']) {
                onNavigate(sponsor_logo['link_url']);
              } else {
                Linking.openURL(sponsor_logo['link_url']);
              }
            }
          }
          >
            <Image
              style={[Styles.bottomText, ]}
              source={{uri: sponsor_logo['img_url']}}
            />
          </TouchableOpacity>
        : null
        }
      </Animated.View>
    );
  }
}

export default CacheScreen;
