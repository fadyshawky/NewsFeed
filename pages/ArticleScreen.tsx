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
  Image,
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

const ArticleScreen = ({navigation, route}) => {
  const {article} = route.params;
  const isFocused = useIsFocused();
  const isDarkMode = useColorScheme() === 'dark';
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function ArticleComponent(articleItem: Article) {
    return (
      <>
        <Text style={styles.titleStyle}>{articleItem.title}</Text>
        <View style={styles.row}>
          <Text style={styles.authorStyle}>{`By- ${articleItem.author}`}</Text>
          <Text
            style={
              styles.authorStyle
            }>{`published at ${articleItem.publishedAt.slice(0, 10)}`}</Text>
        </View>
        <Image
          style={styles.imageStyle}
          source={{uri: articleItem.urlToImage}}
        />
        <Text style={styles.contentStyle}>{articleItem.content}</Text>
      </>
    );
  }
  return (
    <ScrollView
      style={backgroundStyle}
      contentContainerStyle={styles.mainStyle}>
      {ArticleComponent(article)}
    </ScrollView>
  );
};
export default ArticleScreen;
interface Article {
  author: string;
  title: string;
  content: string;
  publishedAt: string;
  description: string;
  urlToImage: string;
  url: string;
}
const styles = StyleSheet.create({
  mainStyle: {
    padding: 5,
    flexGrow: 1,
  },
  titleStyle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorStyle: {
    alignSelf: 'flex-start',
    left: 10,
    fontSize: 14,
    fontWeight: '300',
  },
  imageStyle: {
    marginVertical: 5,
    height: 300,
    width: '100%',
    marginBottom: 5,
    resizeMode: 'contain',
  },
  contentStyle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    height: 500,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
});
