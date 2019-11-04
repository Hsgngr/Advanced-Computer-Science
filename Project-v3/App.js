import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import creditsScene from './src/screens/creditsScene';
import GpsNavigation from './src/screens/GpsNavigation';
import dataFetching from  './src/components/dataFetching';
//import dataFetchingPost from  './src/components/dataFetchingPost';

/* export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
} */

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Credits: creditsScene,
    Navigation: GpsNavigation,
    Data: dataFetching,
  },
  {
    initialRouteName: 'Data',
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 