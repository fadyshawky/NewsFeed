import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
  en: {
    NoArticles: 'No Articles Found\n\nPull page down to refresh',
    search: 'Search',
    enLanguage: 'English',
    arLanguage: 'Arabic',
  },
  ar: {
    NoArticles: 'لا توجد مقالات\n\n اسحب الصفحة لأسفل للتحديث',
    search: 'بحث',
    enLanguage: 'الانجليزية',
    arLanguage: 'العربية',
  },
});

export default strings;
