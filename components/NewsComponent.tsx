import React from 'react';
import type {Node} from 'react';
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
  return (
    <TouchableOpacity style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{context.title}</Text>
      <Text style={styles.authorStyle}>{`by- ${context.author}`}</Text>
      <Image style={styles.imageStyle} source={{uri: context.urlToImage}} />
      <Text>{context.description}</Text>
    </TouchableOpacity>
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
  containerStyle: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    padding: 10,
    shadowColor: Colors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 15,
  },
  imageStyle: {
    height: 200,
    width: '100%',
    marginBottom: 5,
    resizeMode: 'contain',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorStyle: {
    fontSize: 14,
    fontWeight: '300',
    marginVertical: 5,
  },
});
