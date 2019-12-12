import React, {useContext} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Dimensions, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import trackerApi from "../api/tracker";
import {Slider} from "react-native-elements";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sliderValue: 10001,
            mapLoaded: false,
            userRegion: {
                latitude: 0,
                longitude: 0,
                longitudeDelta: 0,
                latitudeDelta: 0,
            },
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            myPosition: { 
                latitude: 0,
                longitude: 0,
            },
        };
    };

    watchID: ?number = null

    componentDidMount() {
        this.updateMarkers();

        navigator.geolocation.getCurrentPosition((position) => {
          var lat = parseFloat(position.coords.latitude)
          var long = parseFloat(position.coords.longitude)

          var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }

          this.setState({initialPosition: initialRegion})
          this.setState({myPosition: initialRegion})
        },

        (error) => alert(JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

          this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var lastRegion = {
              latitude: lat,
              longitude: long,
              longitudeDelta: LONGITUDE_DELTA,
              latitudeDelta: LATITUDE_DELTA,
            }
            this.setState({initialPosition: lastRegion})
            this.setState({myPosition: lastRegion})
          })
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    updateMarkers() {
        let myObj = {sliderValue: this.state.sliderValue}
        trackerApi.post('/locationData3', myObj).then(response => {

            //console.log(response);
            this.setState({
                list: response.data
            })
        }).then(response => {
            this.setState({
                mapLoaded: true
            })
        });
    }

    onRegionChangeComplete = (userRegion) => {
        this.setState({userRegion}); //It caused a delay and bugginess in map.
        console.log(userRegion);
        //Make the fetch request here! Post your location and get some points from Database.
    };

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.initialPosition}
                    //region={this.state.userRegion}
                    style={styles.mapStyle}
                    // onRegionChangeComplete={this.onRegionChangeComplete} //Whenever user stop to change region, sync with setState()
                >

                    {this.state.list.map(list => (
                        list.Latitude && list.Longitude ? <MapView.Marker
                            coordinate={{'latitude': list.Latitude, 'longitude': list.Longitude}}
                            key={list._id}
                            title={" " + list.AVG_Price + "at " + list.Transfer_Date + ", Postcode: " + list.Postcode}
                            pinColor={list.MarkerColor}
                            onCalloutPress={this.markerClick}>
                            <MapView.Callout>
                                <View style={styles.calloutText}>
                                    <Text> Average Price: £{list.AVG_Price} | Postcode: {list.Postcode} |
                                        Date: {list.Transfer_Date} </Text>

                                </View>
                            </MapView.Callout>

                        </MapView.Marker> : null
                    ))}

                    <Marker
                        coordinate={this.state.initialPosition}>
                        <View style={styles.radius}>
                            <View style={styles.marker}></View>
                        </View>
                    </Marker>

                </MapView>
                <View style={styles.sliderContainer}>
                    <Slider
                        value={this.state.sliderValue}
                        onValueChange={sliderValue => this.setState({sliderValue})}
                        sliderLength={Dimensions.get('window').width}
                        minimumValue={0}
                        maximumValue={400000}
                        minimumTrackTintColor='#FF4500'
                        maximumTrackTintColor='#00CED1'
                        thumbTintColor='#FF7F50'
                        step={1000}
                        onSlidingComplete={() => this.updateMarkers()}
                    />
                    <TouchableOpacity
                        onPress={() => this.updateMarkers()}
                    >
                        <Text>Price: £ {this.state.sliderValue}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    sliderContainer: {
        height: 200,
        width: Dimensions.get('window').width-100,
    },
    marker: {
        height: 10,
        width: 10,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007AFF',
    },
    radius: {
        height: 30,
        width: 30,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,1.0)',
        borderWidth: 1,
        borderColor: 'rgba(0,112, 255,1.0)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});