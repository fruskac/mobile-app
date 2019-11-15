import React, { PureComponent } from 'react';
import { Dimensions, Text, ScrollView, Linking } from 'react-native';
import * as Screen from '../../utils/Screen';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import Image from '../Image';

import CommonStyles from '../../styles/CommonStyles';

class ItemSingle extends PureComponent {
  render() {
    let { title, image, longText, hasInternet } = this.props;
    console.disableYellowBox = true;
    return (
      <ScrollView>
        <Image
          styles={{width: Screen.width, height: Screen.height / 3 - 27, marginBottom: 12}}
          imgUrl={image || imageUrl}
         />
        <ScrollView style={CommonStyles.newsPadding}>
          <Text style={CommonStyles.textTitle}>{title}</Text>
          <HTML
            onLinkPress={ (evt, href) => { Linking.openURL(href); }}
            html={
              longText
                .replace(new RegExp('<li', 'g'), '<li><i')
                .replace(new RegExp('</li>', 'g'), '</i></li>')
                .replace(new RegExp('<p><iframe', 'g'), '<div><iframe')
                .replace(new RegExp('</iframe></p>', 'g'), '</iframe></div>')
                .replace(new RegExp('="/sites/', 'g'), '="https://fruskac.net/sites/')
                .replace(new RegExp('&lt;', 'g'), '<')
                .replace(new RegExp('&gt;', 'g'), '>')
                .replace(new RegExp('&nbsp;', 'g'), ' ')
                .replace(new RegExp('&quot;', 'g'), '"')
                .replace(new RegExp('&amp;', 'g'), '&')
                .replace(new RegExp('style="height:[1-9][0-9]{1,2}px; width:[1-9][0-9]{1,2}px"', 'g'), 'style="object-fit:cover"') // 'style="width:100%; height:\'auto\'; object-fit:\'cover\'; "')
              }
            imagesMaxWidth={Dimensions.get('window').width}
            tagsStyles={{
              h1: {fontFamily: 'Merriweather-Light'},
              h2: {
                fontFamily: 'Merriweather-Light',
                fontSize: 18, 
                fontStyle: 'italic',
                paddingTop: 9,
                paddingBottom: 6,
              },
              h3: {fontFamily: 'Merriweather-Light'},
              p: {
                fontFamily: 'Merriweather-Light',
                lineHeight: 21,
                paddingTop: 9,
                paddingBottom: 6,
                fontSize: 15,
                color: '#454546'
              },
              b: {
                fontFamily: 'Merriweather-Light',
                fontSize: 15,
                color: '#272730',
              },
              strong: {
                fontFamily: 'Merriweather-Light',
                fontSize: 15,
                color: '#272730',
              },
              ul: {
                margin: 9
              },
              li: {
                margin: 0,
                padding: 0,
                fontSize: 15
              },
              a: {
                color: '#558B2F'
              },
              div: {
                position: 'relative',
              },
              i: {
                lineHeight: 21,
                fontSize: 15,
                color: '#212121'
              }
            }}
          />
        </ScrollView>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = { };
const mapStateToProps = (state, ownProps) => {
  return {
    hasInternet: state.cache.hasInternet,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSingle);
