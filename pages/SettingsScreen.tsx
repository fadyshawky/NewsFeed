import React, {useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import {useColorScheme, View, Switch, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import strings from '../Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const SettingsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const isFocused = useIsFocused();
  const [isLangEnabled, setLangEnabled] = useState(false);
  const [isDarkEnabled, setDarkEnabled] = useState(false);

  async function getSavedState() {
    const savedStateLanguage = await AsyncStorage.getItem('@language');
    if (savedStateLanguage) {
      if (savedStateLanguage === 'en') {
        setLangEnabled(false);
      } else {
        setLangEnabled(true);
      }
    }
  }
  useEffect(() => {
    if (isFocused) {
      getSavedState();
    }
  }, [isFocused]);

  const toggleLangSwitch = () => {
    const lang = strings.getLanguage();
    if (lang === 'en') {
      strings.setLanguage('ar');

      try {
        AsyncStorage.setItem('@language', 'ar');
      } catch (e) {
        console.log('storingError');
      }
    } else {
      strings.setLanguage('en');

      try {
        AsyncStorage.setItem('@language', 'en');
      } catch (e) {
        console.log('storingError');
      }
    }
    setLangEnabled(previousState => !previousState);
  };

  const switchContainerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  };

  const textLabelStyle = {
    fontSize: 16,
    fontWeight: '400',
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };
  const LanguageSwitch = () => {
    return (
      <View style={switchContainerStyle as any}>
        <Text style={textLabelStyle as any}>{strings.enLanguage}</Text>
        <Switch
          trackColor={{false: 'black', true: 'black'}}
          onValueChange={toggleLangSwitch}
          value={isLangEnabled}
        />
        <Text style={textLabelStyle as any}>{strings.arLanguage}</Text>
      </View>
    );
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-evenly',
    flex: 1,
  };

  return (
    <View style={backgroundStyle as any}>
      <LanguageSwitch />
    </View>
  );
};
export default SettingsScreen;
