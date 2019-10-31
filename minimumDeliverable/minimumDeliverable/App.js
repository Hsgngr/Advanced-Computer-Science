import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ComponentsScreen from './src/screens/ComponentsScreen';
import GpsNavigation from './src/screens/GpsNavigation';
import Credits from './src/screens/credits';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen, 
    Navigation: GpsNavigation,
    Credits: Credits
  },
  {
    initialRouteName: 'Home', //Ilk display olucak compenent'ı gösteriyor.
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
