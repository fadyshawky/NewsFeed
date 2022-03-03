import React from 'react';
import type {ReactNode} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
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
  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    padding: 10,
    shadowColor: isDarkMode ? Colors.lighter : Colors.darker,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    elevation: 3,
    borderRadius: 15,
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  const authorStyle = {
    fontSize: 14,
    fontWeight: '300',
    marginVertical: 5,
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  const descriptionStyle = {
    fontSize: 14,
    marginVertical: 5,
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };
  return (
    <TouchableOpacity onPress={context.selectFunction} style={containerStyle}>
      <Text style={titleStyle}>{context.title}</Text>
      <Text style={authorStyle}>{`by- ${context.author}`}</Text>
      <Image style={styles.imageStyle} source={{uri: context.urlToImage}} />
      <Text style={descriptionStyle}>{context.description}</Text>
    </TouchableOpacity>
  );
}

interface News {
  selectFunction: Function;
  author: string;
  title: string;
  description: string;
  urlToImage: string;
}
export default NewsComponent;

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: '100%',
    marginBottom: 5,
    resizeMode: 'contain',
  },
});
