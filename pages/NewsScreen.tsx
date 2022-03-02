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
  Text,
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
import SearchTextInput from '../SearchTextInput';

const date = new Date().toISOString().slice(0, 10);

const NewsScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const isDarkMode = useColorScheme() === 'dark';
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  let url =
    'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=' +
    '' +
    date +
    '&' +
    'sortBy=popularity&' +
    'apiKey=c5fb20aacb404653a7ceb53719e65f1c';

  let req = new Request(url);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews(req);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  async function fetchNews(url) {
    try {
      setRefreshing(true);
      await fetch(url)
        .then(response => response.json())
        .then(json => {
          console.log('%c⧭', 'color: #731d1d', json);
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

  function handleSearch(text: string) {
    setSearchText(text);
    let searchUrl =
      'https://newsapi.org/v2/everything?' +
      'q=' +
      text +
      '&' +
      'from=' +
      '' +
      date +
      '&' +
      'sortBy=popularity&' +
      'apiKey=c5fb20aacb404653a7ceb53719e65f1c';

    let searchReq = new Request(searchUrl);
    if (text != '') {
      fetchNews(searchReq);
    } else {
      fetchNews(req);
    }
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={backgroundStyle}>
      <SearchTextInput
        style={styles.SearchBar}
        onChangeText={text => handleSearch(text)}
        placeholder={'Search'}
        placeholderTextColor={'#999999'}
        autoCorrect={false}
        defaultValue={searchText}
      />
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
      {news.length === 0 && (
        <Text style={styles.noNewsStyle}>
          {'No Articles Found\n\nPull page down to refresh'}
        </Text>
      )}
    </ScrollView>
  );
};
export default NewsScreen;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
  },
  SearchBar: {
    width: '90%',
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'left',
    backgroundColor: Colors.white,
    marginVertical: 5,
    borderRadius: 15,
    padding: '2%',
    color: 'black',
    borderWidth: 1,
    borderColor: 'blue',
  },
  noNewsStyle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
