import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function NewsComponent(context: News) {
  return (
    <View style={StyleSheet.containerStyle}>
      <Text>{context.author}</Text>
      <Text>{context.title}</Text>
      <Text>{context.description}</Text>
      <Text>{context.urlToImage}</Text>
    </View>
  );
}

interface News {
  author: string;
  title: string;
  description: string;
  urlToImage: string;
}
export default NewsComponent;

const styles = StyleSheet.create({
  containerStyle: {},
});
