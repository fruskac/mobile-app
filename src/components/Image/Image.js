import React, { Component, Fragment } from 'react';
import { Image } from 'react-native';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';


class MyImage extends Component {  
  render() {
    const { hasInternet, imgUrl, styles } = this.props;
    return (
      <Fragment>
        {hasInternet ?
          <Image
            style={styles}
            source={{ uri: imgUrl }}
            resizeMode='cover'
          />
          :
          <ImageCacheProvider
            urlsToPreload={[imgUrl]}
          >
            <CachedImage
              style={styles}
              source={{ uri: imgUrl }}
              resizeMode='cover'
            />
          </ImageCacheProvider>
        }
      </Fragment>
    );
  }
}

export default MyImage;