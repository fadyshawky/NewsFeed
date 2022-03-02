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

const date = new Date().toISOString().slice(0, 10);
let url =
  'https://newsapi.org/v2/everything?' +
  'q=apple&' +
  'from=' +
  '' +
  date +
  '&' +
  'sortBy=popularity&' +
  'apiKey=c5fb20aacb404653a7ceb53719e65f1c';

const NewsScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const isDarkMode = useColorScheme() === 'dark';
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
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
          console.log('%c⧭', 'color: #731d1d', json.articles[0].content);
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
      // fetchNews();
    }
  }, [isFocused]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function articleSelect(article) {
    navigation.navigate({
      name: 'ArticleScreen',
      params: {
        article: article,
      },
    });
  }

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
              selectFunction={() => articleSelect(newItem)}
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
