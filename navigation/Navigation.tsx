import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsScreen from '../pages/NewsScreen';
import SettingsScreen from '../pages/SettingsScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ArticleScreen from '../pages/ArticleScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="TabStack"
        component={MyTabs}
      />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
