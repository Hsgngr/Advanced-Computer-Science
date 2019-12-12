import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import creditsScene from './src/screens/creditsScene';
import GpsNavigation from './src/screens/GpsNavigation';
import FetchScreen from "./src/screens/FetchScreen";
import Testing from "./src/screens/Testing";
import FingerTracking from "./src/screens/FingerTracking";
import MarkerTesting from "./src/screens/MarkerTesting";
import currentLocation_LatLong from "./src/screens/currentLocation_LatLong";
//import dataFetchingPost from  './src/components/dataFetchingPost';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Credits: creditsScene,
    Navigation: GpsNavigation,
    FetchScreen: FetchScreen,
    Testing: Testing,
    FingerTracking: FingerTracking,
    MarkerTesting: MarkerTesting,
    CurrentLocation: currentLocation_LatLong,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#00CED1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 