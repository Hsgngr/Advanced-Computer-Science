import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import type { Region } from 'react-native-maps';

type Props = {};
type State = { region: ?Region, }


const EIFFEL_TOWER = {
  latitude: 48.858570,
  longitude: 2.294493,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

export default class App extends Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { region: null };
  }
  
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        loaded: true
      });
    } else {
      // only check the location if it has been granted
      // you also may want to wrap this in a try/catch as async functions can throw
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      this.setState({ location, loaded: true, errorMessage: null });
    }
  };

    _showEiffelTower = (): void => this.setState({ region: EIFFEL_TOWER }); //Not working its hard

  render () {
    // check to see if we have loaded
    if (this.state.loaded) {
      // if we have an error message show it
      if (this.state.errorMessage) {
        return (
          <View style={styles.container}>
            <Text>{JSON.stringify(this.state.errorMessage)}</Text>
          </View>
        );
      } else if (this.state.location) {
        // if we have a location show it
        return (
          <View style={ styles.container2 }>  
            <MapView
              //style={{ flex: 1 }}
             style={ styles.mapViewContainer }
             provider={ PROVIDER_GOOGLE }
             region={ this.state.region }
              /* region={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
              }} */
            />
            <View style={ styles.buttonsContainer }>
          <Button title={ 'University of Sussex'} onPress={ this._showEiffelTower }/>
          <Button title={ 'Eiffel Tower'} onPress={ this._showEiffelTower }/>
        </View> 
          </View>    
        );
      }
    } else {
      // if we haven't loaded show a waiting placeholder
      return (
        <View style={styles.container}>
          <Text style = {styles.paragraph}>Loading...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container2: { flex: 1, backgroundColor: 'white' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white' //#8cf2ff
  },
  paragraph: {
    margin: 24,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  mapViewContainer: { flex: 15/16 },
  buttonsContainer: {
    flex : 1/16,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  }

});