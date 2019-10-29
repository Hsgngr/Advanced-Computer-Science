import React, { Component }                       from 'react';
import { StyleSheet, View, Button, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE }                from 'react-native-maps';

/** Models / Types */
import { Region }                            from 'react-native-maps';

 Props = {};
 State = { region: Region }
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { region: null };
  }

  /** Button Handlers */

  _showFacebook = ()=> {};
  _showGoogle = () => {};
  _showEiffelTower = () => {};

  /** Renderers */

  render() {
    return (
      <View style={ styles.container }>
        <MapView
          provider={ PROVIDER_GOOGLE }
          region={ this.state.region }
          style={ styles.mapViewContainer } />

        <View style={ styles.buttonsContainer }>
          <Button title={ 'Facebook' } onPress={ this._showFacebook } />
          <Button title={ 'Google Plex' } onPress={ this._showGoogle } />
          <Button title={ 'University of Sussex' } onPress={ this._showEiffelTower } />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  mapViewContainer: { flex: 1 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  }
});