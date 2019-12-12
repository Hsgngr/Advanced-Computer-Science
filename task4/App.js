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
import {Provider as AuthProvider} from "./src/context/AuthContext";
import {setNavigator} from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

//tiff added screens below
import HomeScreen from './src/screens/HomeScreen';
import FingerTracking from './src/screens/FingerTracking';
import CurrentLocation from './src/screens/CurrentLocation';
import TestCases from './src/screens/TestCases';
import CombinedMaps from './src/screens/CombinedMaps';

//TS: below logic pasted from 'Project-v3' app.js file
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    SignupScreen: SignupScreen,
    SigninScreen: SigninScreen,
    MapScreen: MapScreen,
    FingerTracking: FingerTracking,
    CurrentLocation: CurrentLocation,
    TestCases: TestCases,
    CombinedMaps: CombinedMaps,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

//TS: had to comment out below logic; unable to get in app
/*const switchNavigator = createSwitchNavigator({

import {Provider as LocationProvider} from './src/context/LocationContext';

const switchNavigator = createSwitchNavigator({

    ResolveAuth: ResolveAuthScreen,
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

const App = createAppContainer(switchNavigator);

export default () => {
    return (
        <LocationProvider>
            <AuthProvider>
                <App ref={(navigator) => {
                    setNavigator(navigator)
                }}/>
            </AuthProvider>
        </LocationProvider>
    );
};
*/