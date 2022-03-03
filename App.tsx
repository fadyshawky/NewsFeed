/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {ReactNode} from 'react';
import {
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import RootStack from './navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from './Localization';

const App: () => ReactNode = () => {
  const isDarkMode = useColorScheme() === 'dark';

  async function getStorageItems() {
    const lang = await AsyncStorage.getItem('@language');
    if (lang) {
      strings.setLanguage(lang);
    }
  }

  useEffect(() => {
    getStorageItems();
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={backgroundStyle} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {RootStack()}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
