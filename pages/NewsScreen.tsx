import React, {useEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NewsComponent from '../components/NewsComponent';
import {useIsFocused} from '@react-navigation/native';

const date = new Date();
let url =
  'https://newsapi.org/v2/everything?' +
  'q=Apple&' +
  'from=2022-03-02&' +
  'sortBy=popularity&' +
  'apiKey=c5fb20aacb404653a7ceb53719e65f1c';

const NewsScreen: () => Node = () => {
  const isFocused = useIsFocused();
  const isDarkMode = useColorScheme() === 'dark';
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  let req = new Request(url);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  async function fetchNews() {
    try {
      setRefreshing(true);
      await fetch(req)
        .then(response => response.json())
        .then(json => {
          if (json.status === 'ok') {
            setNews(json.articles);
          } else {
            Alert.alert(json.status, json.message);
          }
        });
      setRefreshing(false);
    } catch (e) {
      Alert.alert('Error', e);
    }
  }
  useEffect(() => {
    if (isFocused) {
      fetchNews();
    }
  }, [isFocused]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={backgroundStyle}>
      {news.length != 0 &&
        news.map(function (newItem, index) {
          return (
            <NewsComponent
              key={String(index)}
              author={newItem.author}
              title={newItem.title}
              description={newItem.description}
              urlToImage={newItem.urlToImage}
            />
          );
        })}
    </ScrollView>
  );
};
export default NewsScreen;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
  },
});
