import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import AccountScreen from './src/screens/AccountScreen';
import MapScreen from './src/screens/MapScreen';
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";

const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        Signup: SignupScreen,
        Signin: SigninScreen
    }),
        mainFlow: createBottomTabNavigator({
          Map: MapScreen,
          trackListFlow: createStackNavigator({
              TrackList: TrackListScreen,
              TrackDetailScreen: TrackDetailScreen
          }),
          TrackCreate: TrackCreateScreen,
          Account: AccountScreen,
            
        })
});

export default createAppContainer(switchNavigator);