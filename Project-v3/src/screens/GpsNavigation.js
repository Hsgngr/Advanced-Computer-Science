import React, {Component, useState} from 'react';
import {Platform, Text, View, StyleSheet, Button, ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import type {Region} from 'react-native-maps';
import postCodes from "../Api/postCodes";

type
    Props = {};
type
    State = { region: ? Region, }

const UNIVERSITY_SUSSEX = {
    latitude: 50.860798412471716,
    longitude: -0.08990714542439898,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02

}

// const [results, setResults] = useState([])
// const [errorMessage, setErrorMessage] = useState('');
//
// const sendData = async (userData) => {
//     try {
//         const response = await postCodes.get('/random/postcodes'); //As an example I am going to use random postcodes to 'GET'
//         setResults(response.data.result);
//         console.log({results});
//     } catch (err) {
//         setErrorMessage('Something went wrong');
//     }
// };
// sendData('BN2 4ED');,

export default class App extends Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {region: null};
    }


    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
                loaded: true
            });
        } else {
            // only check the location if it has been granted
            // you also may want to wrap this in a try/catch as async functions can throw
            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            this.setState({location, loaded: true, errorMessage: null});
        }
    };
    _showMyLocation = (): void => this.setState({region: MY_LOCATION});
    _showUniversityOfSussex = (): void => this.setState({region: UNIVERSITY_SUSSEX});


    render() {
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

                function sendDummyData() {
                    //console.log('I am sending the user data ');
                }

                let timerID = setInterval(sendDummyData, 1000); //

                MY_LOCATION = {
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }
                // if we have a location show it
                return (
                    <View style={styles.container2}>
                        <MapView
                            //style={{ flex: 1 }}
                            style={styles.mapViewContainer}
                            provider={PROVIDER_GOOGLE}
                            region={this.state.region} // TODO: This should be fixed -> It should show myLocation at start.
                            /* region={{
                              latitude: this.state.location.coords.latitude,
                              longitude: this.state.location.coords.longitude,
                              latitudeDelta: 0.05,
                              longitudeDelta: 0.05
                            }} */
                        />
                        <View style={styles.buttonsContainer}>
                            <Button title={'University of Sussex'} onPress={this._showUniversityOfSussex}/>
                            <Button title={'My Location'} onPress={this._showMyLocation}/>
                        </View>
                    </View>
                );
            }
        } else {
            // if we haven't loaded show a waiting placeholder
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Text style={styles.paragraph}>Loading...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container2: {flex: 1, backgroundColor: 'white'},
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
    mapViewContainer: {flex: 1},
    buttonsContainer: {
        flex: 1 / 16,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 16
    }

});