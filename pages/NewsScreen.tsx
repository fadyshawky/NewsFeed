import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NewsComponent from '../components/NewsComponent';

const date = new Date();
let url =
  'https://newsapi.org/v2/everything?' +
  'q=Apple&' +
  'from=2022-03-02&' +
  'sortBy=popularity&' +
  'apiKey=9512d53b64394c13b127e5cf1659540e';

const NewsScreen: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [news, setNews] = useState([]);
  let req = new Request(url);

  async function fetchNews() {
    await fetch(req)
      .then(response => response.json())
      .then(json => setNews(json.articles));

    console.log('%c⧭', 'color: #aa00ff', news);
  }
  useEffect(() => {
    fetchNews();
  });
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <ScrollView style={backgroundStyle}>
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
    height: '100%',
  },
});
