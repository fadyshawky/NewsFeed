import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  useColorScheme,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import NewsComponent from '../components/NewsComponent';
import {useIsFocused} from '@react-navigation/native';
import SearchTextInput from '../SearchTextInput';
import strings from '../Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const date: any = new Date().toISOString().slice(0, 10);

const NewsScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const isDarkMode = useColorScheme() === 'dark';
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  let arUrl =
    'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=' +
    '' +
    date +
    '&' +
    'language=ar&' +
    'sortBy=popularity&' +
    'apiKey=c5fb20aacb404653a7ceb53719e65f1c';
  let enUrl =
    'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=' +
    '' +
    date +
    '&' +
    'language=en&' +
    'sortBy=popularity&' +
    'apiKey=c5fb20aacb404653a7ceb53719e65f1c';

  let arReq = new Request(arUrl);
  let enReq = new Request(enUrl);

  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setNews([]);
    const lang = await AsyncStorage.getItem('@language');
    if (lang === 'ar') {
      fetchNews(arReq);
    } else {
      fetchNews(enReq);
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  async function fetchNews(url: Request) {
    try {
      setRefreshing(true);
      await fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.status === 'ok') {
            if (json.articles.length != 0) {
              setNews(json.articles);
            }
          } else {
            Alert.alert(json.status, json.message);
          }
        });
      wait(2000).then(() => setRefreshing(false));
    } catch (e) {
      Alert.alert('Error', 'something happened');
    }
  }
  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function articleSelect(article: Object) {
    navigation.navigate({
      name: 'ArticleScreen',
      params: {
        article: article,
      },
    });
  }

  async function handleSearch(text: string) {
    setSearchText(text);

    const lang = await AsyncStorage.getItem('@language');
    let searchUrl =
      'https://newsapi.org/v2/everything?' +
      'q=' +
      text +
      '&' +
      'from=' +
      '' +
      date +
      '&' +
      'language=' +
      lang +
      '&' +
      'sortBy=popularity&' +
      'apiKey=c5fb20aacb404653a7ceb53719e65f1c';

    let searchReq = new Request(searchUrl);
    if (text != '') {
      fetchNews(searchReq);
    } else {
      onRefresh();
    }
  }

  function NewsList() {
    return (
      news.length != 0 &&
      news.map(function (newItem, index: number) {
        return (
          <NewsComponent
            selectFunction={() => articleSelect(newItem)}
            key={String(index)}
            author={newItem['author']}
            title={newItem['title']}
            description={newItem['description']}
            urlToImage={newItem['urlToImage']}
          />
        );
      })
    );
  }

  return (
    <>
      {!refreshing && (
        <SearchTextInput
          style={styles.SearchBar}
          onChangeText={(text: string) => handleSearch(text)}
          placeholder={strings.search}
          placeholderTextColor={'black'}
          autoCorrect={false}
          defaultValue={searchText}
        />
      )}
      <ScrollView
        contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={backgroundStyle}>
        {news.length != 0 && NewsList()}
        {!refreshing && news.length === 0 && (
          <Text style={styles.noNewsStyle}>{strings.NoArticles}</Text>
        )}
        {refreshing && news.length === 0 && <ActivityIndicator size="large" />}
      </ScrollView>
    </>
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
